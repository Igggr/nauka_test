from flask import Flask
from app.models import db
from app.views import blp
from app.admin import admin


def create_app(config):
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"
    app.register_blueprint(blp)
    db.init_app(app)

    admin.init_app(app)

    return app


if __name__ == '__main__':
    app = create_app("empty")
    with app.app_context():
        db.create_all()

    app.run()
