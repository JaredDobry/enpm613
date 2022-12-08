from db import db

# need to add identification
class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    identification = db.Column(db.String(80), nullable=False)
    professors = db.relationship("ProfessorModel", back_populates="user", lazy="dynamic")
    students = db.relationship("StudentModel", back_populates="user", lazy="dynamic")
    admins = db.relationship("AdminModel", back_populates="user", lazy="dynamic")
    # name = db.Column(db.String(80), unique=False, nullable=True)
    # identification = db.Column(db.String(80), nullable=True)
    # professors = db.relationship("ProfessorModel", back_populates="user", lazy="dynamic")
    # students = db.relationship("StudentModel", back_populates="user", lazy="dynamic")
    # admins = db.relationship("AdminModel", back_populates="user", lazy="dynamic")

