from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import ExamModel
from schemas import ExamSchema, ExamUpdateSchema



bp = Blueprint("Exams", __name__, description="Operations on exam")


@bp.route("/exam/<int:exam_id>")
class Exam(MethodView):
    # (response code, response format)
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
            exam.exam_grade = exam_data["exam_grade"]
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