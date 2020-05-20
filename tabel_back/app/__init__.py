from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
import os
from app.models import db
from app.views import blp
from app.admin import admin


def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
    app.config.from_object(config)
    app.register_blueprint(blp)
    db.init_app(app)
    admin.init_app(app)
    migrate = Migrate(app, db)

    return app


if __name__ == '__main__':
    app = create_app("app.config.DebugConfig")
    with app.app_context():
        db.create_all()

    app.run()
