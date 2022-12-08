from db import db


class StudentModel(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False
    )
    user = db.relationship("UserModel", back_populates="students")
    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=True
    )
    course = db.relationship("CourseModel", back_populates="students")
    examssubmission = db.relationship("ExamSubmissionModel", back_populates="student", lazy="dynamic")
    assignmentssubmission = db.relationship("AssignmentSubmissionModel", back_populates="student", lazy="dynamic")


