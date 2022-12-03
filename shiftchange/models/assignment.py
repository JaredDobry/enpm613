from db import db


class AssignmentModel(db.Model):
    __tablename__ = "assginments"

    id = db.Column(db.Integer, primary_key=True)
    assignment_name = db.Column(db.String(80), unique=True, nullable=False)
    assignment_description = db.Column(db.String(256), unique=False, nullable=False)
    assignment_grade = db.Column(db.Float(precision=2), unique=False, nullable=True)
    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=False
    )
    course = db.relationship("CourseModel", back_populates="assignments")