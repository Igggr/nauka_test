from marshmallow import Schema, fields
from app.models import Employee, Post


class PostSchema(Schema):
    title = fields.String()


class EmployeeSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    surname = fields.String()
    birth_date = fields.DateTime()
    is_remote = fields.Boolean()
    city = fields.String()
    street = fields.String()
    house = fields.Integer()
    flat = fields.Integer()
    post = fields.Pluck(PostSchema, "title")
