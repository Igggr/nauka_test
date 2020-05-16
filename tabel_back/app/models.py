from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    surname = db.Column(db.String)
    birth_date = db.Column(db.Date)
    work_title = db.Column(db.String)
    is_remote = db.Column(db.Boolean)

    city = db.Column(db.String)
    street = db.Column(db.String)
    house = db.Column(db.Integer)
    flat = db.Column(db.Integer)

    def age(self):
        datetime.utcnow() - self.birth_date
