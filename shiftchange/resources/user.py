from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, get_jwt_identity, create_refresh_token, get_jwt, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import UserModel, ProfessorModel, StudentModel, AdminModel
from schemas import UserSchema, ProfessorSchema, ProfessorUpdateSchema, UserUpdateSchema, LoginSchema

bp = Blueprint("Users", "users", description="Operations on users")


@bp.route("/user/<int:user_id>")
class User(MethodView):
    @bp.response(200, UserSchema)
    def get(self, user_id):
        """Get a specific user

        Get a specific user's Info. by user_id
        The return value will be serialized by UserSchema

        Args:
            user_id: user's unique id
        Returns:
            user object
        Raises:
            404, if Not found
        """
        user = UserModel.query.get_or_404(user_id)
        return user

    def delete(self, user_id):
        """delete a specific user

        Delete a specific user by user's unique id

        Args:
            user_id: user's unique id
        Returns:
            {"message": "User deleted."}, 200
        Raises:
            404, if Not found
        """
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted."}, 200


@bp.route("/professor/<int:user_id>")
class User(MethodView):
    @bp.response(200, UserSchema)
    def get(self, user_id):
        """get a user information by user_id

        Args:
            user_id: user's unique id
        Returns:
            id: uid
            username
            name
            identification: student or professor or admin
            professors: if not a professor the value is [] or will return professor_id
            students: if not a student the value is [] or will return student_id
            admins: if not a admin the value is [] or will return admin_id
        Raises:
            404, if Not found
        """
        user = UserModel.query.get_or_404(user_id)
        return user


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


@bp.route("/login")
class UserLogin(MethodView):
    @bp.arguments(LoginSchema)
    def post(self, user_data):
        """login

        Args:
            username and password
        Returns:
            access token
        Raises:
            404, if Not found
        """
        user = UserModel.query.filter(UserModel.username == user_data["username"]).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }, 200
            # access_token = create_access_token(identity=user.id)
            # return {"access_token": access_token}, 200

        abort(401, message="Invalid credentials.")