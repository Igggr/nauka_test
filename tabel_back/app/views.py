from flask import Blueprint, jsonify, request
from app.models import Employee, db
from app.serializer import EmployeeSchema

blp = Blueprint("blp", __name__)

employees_schema = EmployeeSchema(many=True)
employee_schema = EmployeeSchema()

@blp.route('/')
def index():
    return "main"


@blp.route('/employees/')
def all_employees():
    employees = Employee.query.all()
    serialized_data = employees_schema.dumps(employees)
    return serialized_data, 200


@blp.route('/employees/<int:id>/')
def employee_details(id):
    employee = Employee.query.get_or_404(id)
    serialized_data = employee_schema.dumps(employee)
    return serialized_data, 200


@blp.route("/employees/", methods=['POST'])
def create_employee():
    employee = employee_schema.load(request.json)
    employee.save()
    return "ok", 200


@blp.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):
    employee = Employee.query.get(id)
    tmp = employee_schema.load(request.json)     # tmp will not be saved in database
    employee.copy_data(tmp)                      # it just used to update employee data
    db.session.remove()                          # prevent tmp from being written in database
    employee.save()
    return "ok", 200
