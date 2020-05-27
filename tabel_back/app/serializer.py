from marshmallow import Schema, fields, post_load
from datetime import date
from app.models import Employee, Post


class PostSchema(Schema):
    id = fields.Integer()
    title = fields.String()


class EmployeeSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    surname = fields.String()
    birth_date = fields.Date()
    is_remote = fields.Boolean()
    city = fields.String()
    street = fields.String()
    house = fields.Integer()
    flat = fields.Integer()
    post = fields.Pluck(PostSchema, "title")

    @post_load
    def create_employee(self, data, **args):
        title = data['post']['title']
        post = Post.query.filter_by(title=title).first()
        data['post'] = post
        employee = Employee(**data)
        return employee
