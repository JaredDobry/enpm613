from flask import Flask
from flask_smorest import Api
from db import db
import os
import models
from resources.course import bp as CourseBlueprint
from resources.user import bp as UserBlueprint
from flask_jwt_extended import JWTManager
from resources.assignment import bp as AssignmentBlueprint
from resources.course import bp as CourseBlueprint
from resources.exam import bp as ExamBlueprint

def create_app(db_url=None):
    app= Flask(__name__, instance_path=os.getcwd())
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "ShiftChange REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    '''
    Access api document in localhost:portNumberYouAreUsingForThisProject/swagger-ui
    '''
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    '''
    Use to connect the postgresql db need to "from settings import SQLALCHEMY_DATABASE_URI"
    to get the SQLALCHEMY_DATABASE_URI, we can use sqlite first when we are developing this project
    and migrate to local postgresql db or online postgresql db after completed.
    This is just my opinion, up to you.
    '''
    # app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI

    '''
    sqlite setting up
    '''
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    '''
    Use to build sqlite db in root folder
    '''
    api = Api(app)
    # only use in development
    # In deployment we need to store it in .env or settings.py file.
    app.config["JWT_SECRET_KEY"] = "development"
    jwt = JWTManager(app)
    with app.app_context():
        db.create_all()

    api.register_blueprint(UserBlueprint)
    api.register_blueprint(AssignmentBlueprint)
    api.register_blueprint(CourseBlueprint)
    api.register_blueprint(ExamBlueprint)

    return app
