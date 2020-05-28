from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
#from flask.ext.restless import APIManager
import os
from app.models import db, Employee
from app.views import blp
from app.admin import admin


def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
    #api_manager = APIManager(app, flask_sqlalchemy_db=db)
    #api_manager.create_api(Employee, methods=['GET', 'POST', 'PUT', 'DELETE'])
    app.config.from_object(config)
    app.register_blueprint(blp)
    db.init_app(app)
    admin.init_app(app)
    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()

    return app


app = create_app("app.config.DebugConfig")
