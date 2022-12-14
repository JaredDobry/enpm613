export const BASE_URL =
  process.env.NODE_ENV === "development" ? "" : "http://127.0.0.1:5001";
export const REGISTER_URL = `${BASE_URL}/register`;
export const LOGIN_URL = `${BASE_URL}/login`;
export const COMMENT_URL = `${BASE_URL}/comment`;
export const STATUS_URL = `${BASE_URL}/status`;
export const SUBMISSION_URL = `${BASE_URL}/submission`;
export const MATERIAL_URL = `${BASE_URL}/material`;
export const ASSIGNMENT_MANAGEMENT_URL = `${BASE_URL}/assignment`;
export const GRADE_URL = `${BASE_URL}/grade`;
export const ENROLL_URL = `${BASE_URL}/enrollment`;
export const USER_URL = (userId: string) => {
  return `${BASE_URL}/user/${userId}`;
};
export const ENROLLMENTS_URL = (userId: string) => {
  return `${USER_URL(userId)}/enrollments`;
};
export const CLASSES_URL = `${BASE_URL}/classes`;
export const CLASS_URL = (classId: string) => {
  return `${BASE_URL}/class/${classId}`;
};
export const CLASS_ENROLLMENTS_URL = (classId: string) => {
  return `${CLASS_URL(classId)}/enrollments`;
};
export const CLASS_MATERIALS_URL = (classId: string) => {
  return `${CLASS_URL(classId)}/materials`;
};
export const ASSIGNMENT_URL = (assignmentId: string) => {
  return `${BASE_URL}/assignment/${assignmentId}`;
};
export const ASSIGNMENT_STATUS_URL = (assignmentId: string, userId: string) => {
  return `${ASSIGNMENT_URL(assignmentId)}/status/${userId}`;
};
export const ASSIGNMENT_SUBMISSIONS_URL = (
  assignmentId: string,
  userId?: string
) => {
  return `${ASSIGNMENT_URL(assignmentId)}/submissions${
    userId ? `/${userId}` : ""
  }`;
};
export const ASSIGNMENT_COMMENTS_URL = (
  assignmentId: string,
  studentId: string
) => {
  return `${ASSIGNMENT_URL(assignmentId)}/comments/${studentId}`;
};
export const ASSIGNMENT_GRADE_URL = (assignmentId: string, userId: string) => {
  return `${ASSIGNMENT_URL(assignmentId)}/grade/${userId}`;
};
export const ASSIGNMENTS_URL = (id: string, type: "user" | "class") => {
  if (type === "user") return `${USER_URL(id)}/assignments`;
  else return `${CLASS_URL(id)}/assignments`;
};

export type ApiAuthenticatedPost = {
  token: string;
};

export type ApiError = {
  message: string;
};

export type ApiUser = {
  id: string;
  name: string;
  sysadmin?: boolean;
};

export type ApiClass = {
  id: string;
  code: string;
  name: string;
};

export enum EnrollmentTypes {
  student = "student",
  teaching_assistant = "teaching_assistant",
  professor = "professor",
}

export type ApiEnrollment = {
  class_id: string;
  user_id: string;
  enrollment_type: EnrollmentTypes;
};

export type ApiCourseMaterial = {
  id: string;
  class_id: string;
  name: string;
  link: string;
};

export type ApiAssignment = {
  id: string;
  class_id: string;
  description?: string;
  link: string;
  name: string;
};

export enum AssignmentStatusTypes {
  todo = "todo",
  inwork = "inwork",
  complete = "complete",
}

export type ApiAssignmentStatus = {
  assignment_id: string;
  user_id: string;
  status: AssignmentStatusTypes;
};

export type ApiSubmission = {
  id: string;
  assignment_id: string;
  user_id: string;
  link: string;
  name: string;
  timestamp: string;
};

export type ApiGrade = {
  assignment_id: string;
  user_id: string;
  grade: number;
};

export type ApiComment = {
  id: string;
  assignment_id: string;
  student_id: string;
  author_id: string;
  text: string;
  timestamp: string;
};

export enum ApiLoginTypes {
  admin = "admin",
  professor = "professor",
  student = "student",
}

export type ApiLoginResponse = {
  account_type: ApiLoginTypes;
  user_id: string;
  token: string;
};

export type ApiRegisterPost = {
  username: string;
  password: string;
};

export type ApiLoginPost = ApiRegisterPost;

export type ApiCommentPost = {
  comment: ApiComment;
} & ApiAuthenticatedPost;

export type ApiStatusPost = {
  status: ApiAssignmentStatus;
} & ApiAuthenticatedPost;

export type ApiSubmissionPost = {
  blob: string;
  submission: ApiSubmission;
} & ApiAuthenticatedPost;

export enum AddRemove {
  add = "add",
  remove = "remove",
}

export type ApiMaterialPost = {
  action_type: AddRemove;
  id?: string;
  blob?: string;
  class_id?: string;
  name?: string;
} & ApiAuthenticatedPost;

export type ApiAssignmentPost = {
  action_type: AddRemove;
  id?: string;
  blob?: string;
  class_id?: string;
  description?: string;
  name?: string;
} & ApiAuthenticatedPost;

export type ApiGradePost = {
  assignment_id: string;
  student_id: string;
  grade: number;
} & ApiAuthenticatedPost;

export type ApiEnrollPost = {
  action_type: AddRemove;
  enrollment_type?: "student" | "professor";
  class_id: string;
  user_id: string;
} & ApiAuthenticatedPost;
