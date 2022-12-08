from db import db


class AssignmentModel(db.Model):
    __tablename__ = "assignments"

    id = db.Column(db.Integer, primary_key=True)
    assignment_name = db.Column(db.String(80), unique=True, nullable=False)
    assignment_description = db.Column(db.String(256), unique=False, nullable=True)
    # assignment_grade = db.Column(db.Float(precision=2), unique=False, nullable=True)
    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=False
    )
    course = db.relationship("CourseModel", back_populates="assignments")
    assignmentssubmission = db.relationship("AssignmentSubmissionModel", back_populates="assignment", lazy="dynamic")
    professor_id = db.Column(
        db.Integer, db.ForeignKey("professors.id"), unique=False, nullable=False
    )
    professor = db.relationship("ProfessorModel", back_populates="assignments")