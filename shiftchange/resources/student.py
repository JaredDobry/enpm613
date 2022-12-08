from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import ExamSubmissionModel, AssignmentSubmissionModel
from schemas import StudentExamSubmissionSchema, StudnetAssignmentSubmissionSchema, \
    StudentSubmissionResponseSchema, StudentExamSubmissionResponseSchema

bp = Blueprint("Students", __name__, description="Operations on student")


@bp.route("/exam/submission")
class ExamSub(MethodView):
    @bp.arguments(StudentExamSubmissionSchema)
    @bp.response(201, StudentExamSubmissionResponseSchema)
    def post(self, exam_data):
        """Submit a exam for specific course

        Args:
            course_id
	        student_id
	        exam_id
	        exam_name
	        exam_submission
        Returns:
            examssubmission
        Raises:
            Abort: A user with that username already exists.
        """
        examssubmission = ExamSubmissionModel(**exam_data)
        try:
            db.session.add(examssubmission)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the exam.")

        return examssubmission


@bp.route("/assignment/submission")
class AssignmentSub(MethodView):
    @bp.arguments(StudnetAssignmentSubmissionSchema)
    @bp.response(201, StudentSubmissionResponseSchema)
    def post(self, assignment_data):
        """Submit a exam for specific course

        Args:
            course_id
	        student_id
	        exam_id
	        exam_name
	        exam_submission
        Returns:
            examssubmission
        Raises:
            Abort: A user with that username already exists.
        """
        assignmentSubmission = AssignmentSubmissionModel(**assignment_data)
        try:
            db.session.add(assignmentSubmission)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the exam.")

        return assignmentSubmission