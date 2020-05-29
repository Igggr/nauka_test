import os

parent_directory = os.path.dirname(os.path.dirname(__file__))
image_folder = os.path.join(parent_directory, 'photos')


class BaseConfig:
    UPLOAD_FOLDER = image_folder


class DebugConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProdConfig(BaseConfig):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

