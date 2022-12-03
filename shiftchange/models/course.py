from db import db


class CourseModel(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(80), unique=True, nullable=False)
    course_code = db.Column(db.String(80), unique=True, nullable=False)
    assignments = db.relationship("AssignmentModel", back_populates="course", lazy="dynamic")
    exams = db.relationship("ExamModel", back_populates="course", lazy="dynamic")



