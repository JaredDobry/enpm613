from flask.views import MethodView
from flask_smorest import Blueprint, abort
from schemas import CourseSchema
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import CourseModel

bp = Blueprint("Courses", __name__, description="Operations on courses")

@bp.route("/course/<int:course_id>")
class Course(MethodView):
  @bp.response(200, CourseSchema)
  def get(self, course_id):
    course = CourseModel.query.get_or_404(course_id)
    return course

  def delete(self, course_id):
    course = CourseModel.get_or_404(course_id)
    raise NotImplementedError("Delete not implemented")

@bp.route("/course")
class CourseList(MethodView):
  @bp.response(200, CourseSchema(many=True))
  def get(self):
    return CourseModel.query.all()

  @bp.arguments(CourseSchema)
  @bp.response(201, CourseSchema)
  def post(self, course_data):
        course = CourseModel(**course_data)
        try:
            db.session.add(course)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="A course with that name already exists.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the course.")

        return course