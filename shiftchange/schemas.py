from marshmallow import Schema, fields

'''
Configure the data check
'''


# class CourseSchema(Schema):
#     id = fields.Int(dump_only=True)
#     course_code = fields.Str(required=True)
#
#
#     course_name = fields.Str(required=True)

class ProfessorSchema(Schema):
  id = fields.Int()


class StudentSchema(Schema):
  id = fields.Int()

class AdminSchema(Schema):
  id = fields.Int()

class ProfessorUpdateSchema(Schema):
  id = fields.Int()
  course_id = fields.Int()

class ProfessorAddToCourseSchema(Schema):
  id = fields.Int()
  course_id = fields.Int()


class StudentAddToCourseSchema(Schema):
  id = fields.Int()
  course_id = fields.Int()


class LoginSchema(Schema):
    # id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    name = fields.Str(required=True)
    identification = fields.Str(required=True)
    professors = fields.List(fields.Nested(ProfessorSchema()), dump_only=True)
    students = fields.List(fields.Nested(StudentSchema()), dump_only=True)
    admins = fields.List(fields.Nested(AdminSchema()), dump_only=True)


class UserUpdateSchema(Schema):
    id = fields.Int()
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    name = fields.Str(required=True)
    identification = fields.Str(required=True)
    professors = fields.List(fields.Nested(ProfessorSchema()), dump_only=True)
    students = fields.List(fields.Nested(StudentSchema()), dump_only=True)
    admins = fields.List(fields.Nested(AdminSchema()), dump_only=True)





class PlainAssignmentSchema(Schema):
  id = fields.Int()
  assignment_name = fields.Str(required=True)
  # assignment_description = fields.Str(required=True)




class PlainCourseSchema(Schema):
  id = fields.Int(dump_only=True)
  course_name = fields.Str(required=True)
  course_code = fields.Str(required=True)

class PlainExamSchema(Schema):
  id = fields.Int(dump_only=True)
  exam_name = fields.Str(required=True)
  # exam_description = fields.Str(required=True)


class PlainTagSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()

class AssignmentUpdateSchema(Schema):
  assignment_name = fields.Str()
  # assignment_grade = fields.Float()
  assignment_description = fields.Str()
  course_id = fields.Int(required=True)


class AssignmentSchema(PlainAssignmentSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  professor_id = fields.Int(required=True, load_only=True)
  professor = fields.Nested(ProfessorSchema(), dump_only=True)
  assignment_name = fields.Str()
  # assignment_grade = fields.Float()
  assignment_description = fields.Str()

class ExamSchema(PlainExamSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  professor_id = fields.Int(required=True, load_only=True)
  professor = fields.Nested(ProfessorSchema(), dump_only=True)
  exam_name = fields.Str()
  exam_description = fields.Str()

class StudnetAssignmentSubmissionSchema(PlainAssignmentSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  student_id = fields.Int(required=True, load_only=True)
  student = fields.Nested(StudentSchema(), dump_only=True)
  assignment_id = fields.Int(required=True, load_only=True)
  assignment = fields.Nested(AssignmentSchema(), dump_only=True)
  assignment_submission = fields.Str()

class StudentSubmissionResponseSchema(Schema):
  student_id = fields.Int(required=True, load_only=True)
  student = fields.Nested(StudentSchema(), dump_only=True)
  assignment_id = fields.Int(required=True, load_only=True)
  assignment = fields.Nested(AssignmentSchema(), dump_only=True)
  assignment_submission = fields.Str()



class CourseSchema(PlainCourseSchema):
  assignments = fields.List(fields.Nested(PlainAssignmentSchema()), dump_only=True)
  exams = fields.List(fields.Nested(PlainExamSchema()), dump_only=True)
  professors = fields.List(fields.Nested(ProfessorSchema()), dump_only=True)
  students = fields.List(fields.Nested(StudentSchema()), dump_only=True)

  # tags = fields.List(fields.Nested(PlainTagSchema()), dump_only=True)






class ExamUpdateSchema(Schema):
  exam_name = fields.Str()
  # exam_grade = fields.Float()
  exam_description = fields.Str()
  course_id = fields.Int(required=True)


class ExamSchema(PlainExamSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  professor_id = fields.Int(required=True, load_only=True)
  professor = fields.Nested(ProfessorSchema(), dump_only=True)
  exam_name = fields.Str()
  # exam_grade = fields.Float()
  exam_description = fields.Str()


class StudentExamSubmissionSchema(PlainExamSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  student_id = fields.Int(required=True, load_only=True)
  student = fields.Nested(StudentSchema(), dump_only=True)
  exam_id = fields.Int(required=True, load_only=True)
  exam = fields.Nested(ExamSchema(), dump_only=True)
  exam_submission = fields.Str()


class StudentExamSubmissionResponseSchema(PlainExamSchema):
  student_id = fields.Int(required=True, load_only=True)
  student = fields.Nested(StudentSchema(), dump_only=True)
  exam_id = fields.Int(required=True, load_only=True)
  exam = fields.Nested(ExamSchema(), dump_only=True)
  exam_submission= fields.Str()

class ProfessorGetAllExamInSpecificCourseSchema(Schema):
    course_id = fields.Int(required=True, load_only=True)


class StudentExamSubmissionResponseSchema(Schema):
  student_id = fields.Int(required=True, load_only=True)
  student = fields.Nested(StudentSchema(), dump_only=True)
  exam_id = fields.Int(required=True, load_only=True)
  exam = fields.Nested(ExamSchema(), dump_only=True)
  exam_submission = fields.Str()



# class StudentExamSubmissionSchema(PlainAssignmentSchema):
#   course_id = fields.Int(required=True, load_only=True)
#   course = fields.Nested(PlainCourseSchema(), dump_only=True)
#   student_id = fields.Int(required=True, load_only=True)
#   student = fields.Nested(StudentSchema(), dump_only=True)
#   exam_id = fields.Int(required=True, load_only=True)
#   exam = fields.Nested(ExamSchema(), dump_only=True)
#   exam_submission = fields.Str()

