from db import db

class AssignmentSubmissionModel(db.Model):
    __tablename__ = "assignmentssubmission"

    id = db.Column(db.Integer, primary_key=True)
    assignment_name = db.Column(db.String(80), unique=False, nullable=False)
    assignment_submission = db.Column(db.String(256), unique=False, nullable=False)
    assignment_grade = db.Column(db.Float(precision=2), unique=False, nullable=True)
    status = db.Column(db.String(256), unique=False, default="TODO")


    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=False
    )
    course = db.relationship("CourseModel", back_populates="assignmentssubmission")


    assignment_id = db.Column(
        db.Integer, db.ForeignKey("assignments.id"), unique=False, nullable=False
    )
    assignment = db.relationship("AssignmentModel", back_populates="assignmentssubmission")


    student_id = db.Column(
        db.Integer, db.ForeignKey("students.id"), unique=False, nullable=False
    )
    student = db.relationship("StudentModel", back_populates="assignmentssubmission")