from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    create_refresh_token,
    get_jwt,
    jwt_required,
)

from db import db
from models import UserModel
from schemas import UserSchema, LoginSchema


bp = Blueprint("Users", "users", description="Operations on users")


@bp.route("/add_user")
class Add_user(MethodView):
    @bp.arguments(UserSchema)
    def post(self, user_data):
        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user = UserModel(
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            user_type=user_data["user_type"],
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201


@bp.route("/user/<int:user_id>")
class User(MethodView):
    @bp.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user

    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted."}, 200


@bp.route("/login")
class UserLogin(MethodView):
    @bp.arguments(LoginSchema)
    def post(self, login: LoginSchema):
        user = UserModel.query.filter(UserModel.username == login["username"]).first()

        if user and pbkdf2_sha256.verify(login["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }, 200
            # access_token = create_access_token(identity=user.id)
            # return {"access_token": access_token}, 200

        abort(401, message="Invalid credentials.")


# it can be use in some action, every action will be jwt_required() in future
# And some action is dangerous we can use jwt_required(fresh=True)
@bp.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        # get_jwt_identity() return null if not current_user
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200
