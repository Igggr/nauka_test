from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key= True)
    title = db.Column(db.String)
    employees = db.relationship("Employee", back_populates="post")

    def __str__(self):
        return self.title


class Employee(db.Model):
    __tablename__ = 'employees'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String)
    surname = db.Column(db.String)
    birth_date = db.Column(db.Date)
    is_remote = db.Column(db.Boolean)

    city = db.Column(db.String)
    street = db.Column(db.String)
    house = db.Column(db.Integer)
    flat = db.Column(db.Integer)

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post = db.relationship(Post, back_populates="employees")
