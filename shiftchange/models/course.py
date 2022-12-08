from db import db


class CourseModel(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(80), unique=True, nullable=False)
    course_code = db.Column(db.String(80), unique=True, nullable=False)
    assignments = db.relationship("AssignmentModel", back_populates="course", lazy="dynamic")
    exams = db.relationship("ExamModel", back_populates="course", lazy="dynamic")
    professors = db.relationship("ProfessorModel", back_populates="course", lazy="dynamic")
    students = db.relationship("StudentModel", back_populates="course", lazy="dynamic")
    examssubmission = db.relationship("ExamSubmissionModel", back_populates="course", lazy="dynamic")
    assignmentssubmission = db.relationship("AssignmentSubmissionModel", back_populates="course", lazy="dynamic")





