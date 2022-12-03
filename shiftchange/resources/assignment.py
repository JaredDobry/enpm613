from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import AssignmentModel
from schemas import AssignmentSchema, AssignmentUpdateSchema



bp = Blueprint("Assignments", __name__, description="Operations on assignment")


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
            assignment.assignment_grade = assignment_data["assignment_grade"]
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