from marshmallow import Schema, fields

'''
Configure the data check
'''


# class CourseSchema(Schema):
#     id = fields.Int(dump_only=True)
#     course_code = fields.Str(required=True)
#     course_name = fields.Str(required=True)

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)




class PlainAssignmentSchema(Schema):
  id = fields.Int(dump_only=True)
  assignment_name = fields.Str(required=True)
  assignment_description = fields.Str(required=True)




class PlainCourseSchema(Schema):
  id = fields.Int(dump_only=True)
  course_name = fields.Str(required=True)
  course_code = fields.Str(required=True)

class PlainExamSchema(Schema):
  id = fields.Int(dump_only=True)
  exam_name = fields.Str(required=True)
  exam_description = fields.Str(required=True)


class PlainTagSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()

class AssignmentUpdateSchema(Schema):
  assignment_name = fields.Str()
  assignment_grade = fields.Float()
  assignment_description = fields.Str()
  course_id = fields.Int(required=True)


class AssignmentSchema(PlainAssignmentSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  assignment_name = fields.Str()
  assignment_grade = fields.Float()
  assignment_description = fields.Str()

class CourseSchema(PlainCourseSchema):
  assignments = fields.List(fields.Nested(PlainAssignmentSchema()), dump_only=True)
  exams = fields.List(fields.Nested(PlainExamSchema()), dump_only=True)

  # tags = fields.List(fields.Nested(PlainTagSchema()), dump_only=True)





class ExamUpdateSchema(Schema):
  exam_name = fields.Str()
  exam_grade = fields.Float()
  exam_description = fields.Str()
  course_id = fields.Int(required=True)


class ExamSchema(PlainExamSchema):
  course_id = fields.Int(required=True, load_only=True)
  course = fields.Nested(PlainCourseSchema(), dump_only=True)
  exam_name = fields.Str()
  exam_grade = fields.Float()
  exam_description = fields.Str()



