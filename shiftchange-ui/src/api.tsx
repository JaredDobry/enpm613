export const BASE_URL = "";
export const LOGIN_URL = `${BASE_URL}/login`;
export const COMMENT_URL = `${BASE_URL}/comment`;
export const STATUS_URL = `${BASE_URL}/status`;
export const USER_URL = (userId: string) => {
  return `${BASE_URL}/user/${userId}`;
};
export const ENROLLMENTS_URL = (userId: string) => {
  return `${USER_URL(userId)}/enrollments`;
};
export const CLASS_URL = (classId: string) => {
  return `${BASE_URL}/class/${classId}`;
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

export type ApiLoginPost = {
  username: string;
  password: string;
};

export type ApiCommentPost = {
  comment: ApiComment;
} & ApiAuthenticatedPost;

export type ApiStatusPost = {
  status: ApiAssignmentStatus;
} & ApiAuthenticatedPost;
