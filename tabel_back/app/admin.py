from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from app.models import Employee, Post, db


admin = Admin()
admin.add_view(ModelView(Post, db.session))
admin.add_view(ModelView(Employee, db.session))
