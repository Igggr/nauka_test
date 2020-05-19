class DebugConfig:
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProdConfig:
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
