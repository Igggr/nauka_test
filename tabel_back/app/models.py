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

    def __repr__(self):
        return f"Employee<name: {self.name}, surname: {self.surname}, post: {self.post.title}>"

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception:
            db.session.remove()

    def copy_data(self, tmp):          # all columns, except id
        self.name = tmp.name
        self.surname = tmp.surname
        self.birth_date = tmp.birth_date
        self.is_remote = tmp.is_remote
        self.post = tmp.post
        self.city = tmp.city
        self.street = tmp.street
        self.house = tmp.house
        self.flat = tmp.flat
