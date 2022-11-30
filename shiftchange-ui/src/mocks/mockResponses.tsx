import {
  ApiAssignment,
  ApiAssignmentStatus,
  ApiClass,
  ApiComment,
  ApiCourseMaterial,
  ApiEnrollment,
  ApiGrade,
  ApiSubmission,
  ApiUser,
  AssignmentStatusTypes,
  EnrollmentTypes,
} from "../api";

import doc from "../resources/doc.docx";

export const mockUsers: ApiUser[] = [
  {
    id: "0",
    name: "Diane Ditko",
  },
  {
    id: "1",
    name: "Jared Dobry",
  },
  {
    id: "2",
    name: "Hyun Jo Choi",
  },
  {
    id: "3",
    name: "Wei Lun Hsu",
  },
  {
    id: "4",
    name: "Dr. Barber",
  },
];

export const mockClasses: ApiClass[] = [
  {
    id: "0",
    code: "ENPM611",
    name: "Software Engineering",
  },
  {
    id: "1",
    code: "ENPM612",
    name: "System and Software Requirements",
  },
  {
    id: "2",
    code: "ENPM613",
    name: "Software Design and Implementation",
  },
  {
    id: "3",
    code: "ENPM614",
    name: "Software Testing and Maintenance",
  },
  {
    id: "4",
    code: "ENPM808E",
    name: "Managing Software Engineering Projects",
  },
  {
    id: "5",
    code: "ENPM809K",
    name: "Fundamentals for Artificial Intelligence and Deep Learning Frameworks",
  },
];

export const mockEnrollments: ApiEnrollment[] = [
  {
    class_id: "2",
    user_id: "0",
    enrollment_type: EnrollmentTypes.student,
  },
  {
    class_id: "2",
    user_id: "1",
    enrollment_type: EnrollmentTypes.student,
  },
  {
    class_id: "2",
    user_id: "2",
    enrollment_type: EnrollmentTypes.student,
  },
  {
    class_id: "2",
    user_id: "3",
    enrollment_type: EnrollmentTypes.student,
  },
  {
    class_id: "2",
    user_id: "4",
    enrollment_type: EnrollmentTypes.professor,
  },
  {
    class_id: "5",
    user_id: "1",
    enrollment_type: EnrollmentTypes.student,
  },
];

export const mockCourseMaterial: ApiCourseMaterial[] = [
  {
    id: "0",
    class_id: "2",
    link: doc,
    name: "Lecture 1",
  },
  {
    id: "1",
    class_id: "2",
    link: doc,
    name: "Lecture 2",
  },
  {
    id: "2",
    class_id: "2",
    link: doc,
    name: "Lecture 3",
  },
  {
    id: "3",
    class_id: "2",
    link: doc,
    name: "Lecture 4",
  },
];

export const mockAssignments: ApiAssignment[] = [
  {
    id: "0",
    class_id: "2",
    name: "Preliminary architecture decisions",
    link: doc,
  },
  {
    id: "1",
    class_id: "2",
    name: "Architecture styles and tactics",
    link: doc,
  },
  {
    id: "2",
    class_id: "2",
    name: "Architecture Views",
    link: doc,
  },
  {
    id: "3",
    class_id: "2",
    name: "Software architecture document",
    link: doc,
  },
  {
    id: "4",
    class_id: "2",
    name: "Detailed design exercise",
    link: doc,
  },
  {
    id: "5",
    class_id: "2",
    name: "Software architecture and detailed design",
    link: doc,
  },
];

export const mockStatuses: ApiAssignmentStatus[] = [
  {
    assignment_id: "0",
    user_id: "0",
    status: AssignmentStatusTypes.complete,
  },
  {
    assignment_id: "1",
    user_id: "0",
    status: AssignmentStatusTypes.inwork,
  },
  {
    assignment_id: "2",
    user_id: "0",
    status: AssignmentStatusTypes.inwork,
  },
  {
    assignment_id: "3",
    user_id: "0",
    status: AssignmentStatusTypes.todo,
  },
  {
    assignment_id: "4",
    user_id: "0",
    status: AssignmentStatusTypes.todo,
  },
  {
    assignment_id: "5",
    user_id: "0",
    status: AssignmentStatusTypes.todo,
  },
  {
    assignment_id: "0",
    user_id: "1",
    status: AssignmentStatusTypes.complete,
  },
  {
    assignment_id: "1",
    user_id: "1",
    status: AssignmentStatusTypes.inwork,
  },
  {
    assignment_id: "2",
    user_id: "1",
    status: AssignmentStatusTypes.inwork,
  },
  {
    assignment_id: "3",
    user_id: "1",
    status: AssignmentStatusTypes.todo,
  },
  {
    assignment_id: "4",
    user_id: "1",
    status: AssignmentStatusTypes.todo,
  },
  {
    assignment_id: "5",
    user_id: "1",
    status: AssignmentStatusTypes.todo,
  },
];

export const mockComments: ApiComment[] = [
  {
    id: "0",
    assignment_id: "0",
    author_id: "1",
    student_id: "1",
    text: "Hello professor, can you provide some additional information about the submission guidelines?",
    timestamp: "2022-11-30 14:00",
  },
  {
    id: "1",
    assignment_id: "0",
    author_id: "4",
    student_id: "1",
    text: "Please post the question in a discussion board so when I respond all students can see it.",
    timestamp: "2022-11-30 14:15",
  },
  {
    id: "2",
    assignment_id: "0",
    author_id: "1",
    student_id: "1",
    text: "Alright, will do.",
    timestamp: "2022-11-30 14:30",
  },
];

export const mockSubmissions: ApiSubmission[] = [
  {
    id: "0",
    assignment_id: "0",
    user_id: "1",
    link: doc,
    timestamp: "2022-11-31 10:31",
  },
];

export const mockGrades: ApiGrade[] = [
  {
    assignment_id: "0",
    user_id: "1",
    grade: 89.7,
  },
];
