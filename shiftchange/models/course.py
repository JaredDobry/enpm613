from db import db


'''
simple course db table, please for free to add more column
need to add instructor and students
'''
class CourseModel(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    course_code = db.Column(db.String(80), unique=True, nullable=False)
    course_name = db.Column(db.String(80), unique=False, nullable=False)
    # students = db.relationship("StudentModel", back_populates="course", lazy="dynamic")
