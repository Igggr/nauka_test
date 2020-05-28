from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from app.models import Employee, Post, db
from app.serializer import EmployeeSchema, PostSchema
from flask.views import MethodView

blp = Blueprint("blp", __name__)

employees_schema = EmployeeSchema(many=True)
employee_schema = EmployeeSchema()
posts_schema = PostSchema(many=True)


@blp.route('/')
def index():
    return "main"


@blp.route('/posts/')
def all_posts():
    return posts_schema.dumps(Post.query), 200


@blp.route('/employees/')
def all_employees():
    employees = Employee.query.all()
    serialized_data = employees_schema.dumps(employees)
    return serialized_data, 200


@blp.route("/employees/", methods=['POST'])
def create_employee():
    employee = employee_schema.load(request.json)
    employee.save()
    return str(employee.id), 200


class EmployeeView(MethodView):
    methods = ["GET", "DELETE", "PUT"]
  
    def get(self, uid):
        employee = Employee.query.get_or_404(uid)
        serialized_data = employee_schema.dumps(employee)
        return serialized_data, 200
    
    def delete(self, uid):
        employee = Employee.query.get(uid)
        db.session.delete(employee)
        db.session.commit()
        return 'ok', 200
    
    def put(self, uid):
        employee = Employee.query.get(uid)
        tmp = employee_schema.load(request.json)     # tmp will not be saved in database
        employee.copy_data(tmp)                      # it just used to update employee data
        db.session.remove()                          # prevent tmp from being written in database
        employee.save()
        return "ok", 200


blp.add_url_rule(rule="/employees/<int:uid>", view_func=EmployeeView.as_view("employee"))

