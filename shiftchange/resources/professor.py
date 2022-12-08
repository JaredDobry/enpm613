from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask import request
from db import db
from models import ExamModel, CourseModel, AssignmentModel
from schemas import ExamSchema, ExamUpdateSchema, ProfessorGetAllExamInSpecificCourseSchema, CourseSchema, \
    AssignmentSchema, AssignmentUpdateSchema

bp = Blueprint("Professors", __name__, description="Course Management")


@bp.route("/exam/<int:exam_id>")
class Exam(MethodView):
    @bp.response(200, ExamSchema)
    def get(self, exam_id):
        exam = ExamModel.query.get_or_404(exam_id)
        return exam

    def delete(self, item_id):
        exam = ExamModel.query.get_or_404(item_id)
        raise NotImplementedError("Delete not implemented")

    @bp.arguments(ExamUpdateSchema)
    @bp.response(200, ExamSchema)
    def put(self, exam_data, exam_id):
        exam = ExamModel.query.get(exam_id)
        if exam:
            # exam.exam_grade = exam_data["exam_grade"]
            exam.exam_name = exam_data["exam_name"]
            exam.exam_description = exam_data["exam_description"]
        else:
            exam = ExamModel(id=exam_id, **exam_data)
        db.session.add(exam)
        db.session.commit()
        return exam



@bp.route("/exam")
class ExamList(MethodView):
    @bp.response(200, ExamSchema(many=True))
    def get(self):
        return ExamModel.query.all()

    @bp.arguments(ExamSchema)
    @bp.response(201, ExamSchema)
    def post(self, exam_data):
        exam = ExamModel(**exam_data)

        try:
            db.session.add(exam)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the exam.")

        return exam


@bp.route("/assignment/<int:assignment_id>")
class Assignment(MethodView):
    # (response code, response format)
    @bp.response(200, AssignmentSchema)
    def get(self, assignment_id):
        assignment = AssignmentModel.query.get_or_404(assignment_id)
        return assignment

    def delete(self, item_id):
        assignment = AssignmentModel.query.get_or_404(item_id)
        raise NotImplementedError("Delete not implemented")

    @bp.arguments(AssignmentUpdateSchema)
    @bp.response(200, AssignmentSchema)
    def put(self, assignment_data, assignment_id):
        assignment = AssignmentModel.query.get(assignment_id)
        if assignment:
            # assignment.assignment_grade = assignment_data["assignment_grade"]
            assignment.assignment_name = assignment_data["assignment_name"]
            assignment.assignment_description = assignment_data["assignment_description"]
        else:
            assignment = AssignmentModel(id=assignment_id, **assignment_data)
        db.session.add(assignment)
        db.session.commit()
        return assignment



@bp.route("/assignment")
class AssignmentList(MethodView):
    @bp.response(200, AssignmentSchema(many=True))
    def get(self):
        return AssignmentModel.query.all()

    @bp.arguments(AssignmentSchema)
    @bp.response(201, AssignmentSchema)
    def post(self, assignment_data):
        assignment = AssignmentModel(**assignment_data)

        try:
            db.session.add(assignment)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the assignment.")

        return assignment




