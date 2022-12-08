from db import db

class ExamSubmissionModel(db.Model):
    __tablename__ = "examssubmission"

    id = db.Column(db.Integer, primary_key=True)
    exam_name = db.Column(db.String(80), unique=False, nullable=False)
    exam_submission = db.Column(db.String(256), unique=False, nullable=False)
    exam_grade = db.Column(db.Float(precision=2), unique=False, nullable=True)

    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=False
    )
    course = db.relationship("CourseModel", back_populates="examssubmission")


    exam_id = db.Column(
        db.Integer, db.ForeignKey("exams.id"), unique=False, nullable=False
    )
    exam = db.relationship("ExamModel", back_populates="examssubmission")


    student_id = db.Column(
        db.Integer, db.ForeignKey("students.id"), unique=False, nullable=False
    )
    student = db.relationship("StudentModel", back_populates="examssubmission")