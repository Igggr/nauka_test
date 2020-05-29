from flask import Blueprint, jsonify, request, redirect, url_for
from flask import send_from_directory
from flask import current_app
from werkzeug.utils import secure_filename
import os
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

""""
def allowed_file(filename):
    ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg', 'gif')
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
"""

class EmployeePhotoView(MethodView):
    methods = ["POST", "GET"]

    def allowed_file(self, filename):
        ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg', 'gif')
        return '.' in filename and \
                 filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def post(self, uid):
        if 'file' not in request.files:
            print("no file")
            return "-", 400
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            return "-", 400
        print(file.filename)
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = f"photo_{uid}"            # we cant' keep original names - it will be more then one photo.jpg )))
            employee = Employee.query.get(uid)
            employee.photo = new_filename
            employee.save()
            file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], new_filename))
            send_from_directory(current_app.config['UPLOAD_FOLDER'], new_filename)
        return "ok", 200


blp.add_url_rule(rule="/uploads/<int:uid>", view_func=EmployeePhotoView.as_view("avatar"))
