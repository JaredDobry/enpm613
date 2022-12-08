from db import db


class ProfessorModel(db.Model):
    __tablename__ = "professors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    professor_bio = db.Column(db.String(256), unique=False, nullable=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False
    )
    user = db.relationship("UserModel", back_populates="professors")
    course_id = db.Column(
        db.Integer, db.ForeignKey("courses.id"), unique=False, nullable=True
    )
    course = db.relationship("CourseModel", back_populates="professors")
    exams = db.relationship("ExamModel", back_populates="professor", lazy="dynamic")
    assignments = db.relationship("AssignmentModel", back_populates="professor", lazy="dynamic")
