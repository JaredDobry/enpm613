from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, get_jwt_identity, create_refresh_token, get_jwt, jwt_required
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import UserModel, ProfessorModel, StudentModel, AdminModel
from schemas import UserSchema, ProfessorSchema, ProfessorUpdateSchema, UserUpdateSchema, StudentAddToCourseSchema, \
    ProfessorAddToCourseSchema

bp = Blueprint("Admin", __name__, description="System Management")

@bp.route("/add_user")
class Add_user(MethodView):
    @bp.arguments(UserSchema)
    def post(self, user_data):
        """Add a new user.

        The Args will be checked and serialize by UserSchema.
        It will check whether there is a same username in db.

        Args:
            username: account
            password: password
            name: user's name
            identification: only include student, professor, admin
        Returns:
            {"message": "User created successfully."}, 201
        Raises:
            Abort: A user with that username already exists.
        """
        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user = UserModel(
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            identification=user_data["identification"],
            name=user_data["name"]
        )
        db.session.add(user)
        db.session.commit()
        if user_data["identification"] == "professor":
            professor = ProfessorModel(
                user_id=user.id,
                name=user.name
            )
            db.session.add(professor)
            db.session.commit()
        if user_data["identification"] == "student":
            student = StudentModel(
                user_id=user.id,
                name=user.name
            )
            db.session.add(student)
            db.session.commit()
        if user_data["identification"] == "admin":
            admin = AdminModel(
                user_id=user.id,
                name=user.name
            )
            db.session.add(admin)
            db.session.commit()

        return {"message": "User created successfully."}, 201



@bp.route("/course/addP/<int:professor_id>")
class CourseAddProfessor(MethodView):
    @bp.arguments(ProfessorAddToCourseSchema)
    def put(self, professor_data, professor_id):
        """Add a professor into a course.

        The Args will be checked and serialize by ProfessorUpdateSchema.

        Args:
            professor_id: professor_id
            professor_data: include course_id
        Returns:
            {"message": "Professor has been added to that course."}, 201
        Raises:
            abort(404, message="ID not found.")
        """
        professor = ProfessorModel.query.get(professor_id)
        if professor:
            professor.course_id = professor_data["course_id"]
            db.session.add(professor)
            db.session.commit()
            return {"message": "Professor has been added to that course."}, 201
        abort(404, message="ID not found.")


@bp.route("/course/addS/<int:student_id>")
class CourseAddStudent(MethodView):
    @bp.arguments(StudentAddToCourseSchema)
    def put(self, student_data, student_id):
        """Add a student into a course.

        The Args will be checked and serialize by StudentAddToCourseSchema.

        Args:
            student_id: student_id
            course_id: include course_id
        Returns:
            {"message": "Professor has been added to that course."}, 201
        Raises:
            abort(404, message="ID not found.")
        """
        student = StudentModel.query.get(student_id)
        if student:
            student.course_id = student_data["course_id"]
            db.session.add(student)
            db.session.commit()
            return {"message": "Student has been added to that course."}, 201
        abort(404, message="ID not found.")
