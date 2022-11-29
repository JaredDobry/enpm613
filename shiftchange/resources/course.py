from db import db
from sqlalchemy.exc import SQLAlchemyError
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from schemas import CourseSchema
from models import CourseModel
bp = Blueprint("courses", __name__, description="Operations on course")



@bp.route("/course/<int:course_id>")
class Course(MethodView):
    @bp.response(200, CourseSchema)
    def get(self, course_id):
        course = CourseModel.query.get_or_404(course_id)
        return course

    def delete(self, course_id):
        course = CourseModel.query.get_or_404(course_id)
        db.session.delete(course)
        db.session.commit()
        return {"message": "course deleted"}


    # This is modify a course method. It's simple one only modify course_code or course_name
    # maybe we need to add modify professor, or assignment.
    @bp.arguments(CourseSchema)
    @bp.response(200, CourseSchema)
    def put(self, course_data, course_id):
        # notice that course_data is the data receive from client and it's need to put infront of course_id that get from db
        course = CourseModel.query.get(course_id)
        if course:
            course.course_code = course_data["course_code"]
            course.course_name = course_data["course_name"]
        else:
            course = CourseModel(**course_data)
        db.session.add(course)
        db.session.commit()
        return course

@bp.route("/course")
class CourseList(MethodView):
    # need to be fixed
    # get all courses
    #  Now it TypeError: Object of type CourseModel is not JSON serializable
    bp.response(200, CourseSchema)
    def get(self):
        return CourseModel.query.all()

    '''
    create a class. 
    There is a course_id(primary key, increase automatically), and course_code(like ENPM613)
    I do not check the course_name.
    I am not sure what to do is better, please for free to modify.
    '''
    @bp.arguments(CourseSchema)
    @bp.response(201, CourseSchema)
    def post(self, course_data):
        course = CourseModel(**course_data)
        try:
            db.session.add(course)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the course.")
        return course