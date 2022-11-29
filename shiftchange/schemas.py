from marshmallow import Schema, fields

'''
Configure the data check
'''


class CourseSchema(Schema):
    id = fields.Int(dump_only=True)
    course_code = fields.Str(required=True)
    course_name = fields.Str(required=True)

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
