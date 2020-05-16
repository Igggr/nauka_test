from flask import Blueprint

blp = Blueprint("blp", __name__)


@blp.route('/')
def index():
    return "main"
