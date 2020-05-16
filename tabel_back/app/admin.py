from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from app.models import Employee, db


admin = Admin()
admin.add_view(ModelView(Employee, db))
