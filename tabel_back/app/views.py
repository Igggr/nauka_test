from flask import Blueprint, jsonify, request
from app.models import Employee
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
def employee(id):
    employee = Employee.query.get_or_404(id)
    serialized_data = employee_schema.dumps(employee)
    return serialized_data, 200


@blp.route("/employees/", methods=['POST'])
def create_employee():
    employee = employee_schema.load(request.json)
    employee.save()
    return "ok", 200
