import {
  ApiAssignment,
  ApiAssignmentStatus,
  ApiClass,
  ApiCourseMaterial,
  ApiEnrollment,
  ApiUser,
  AssignmentStatusTypes,
  EnrollmentTypes,
} from "../api";

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

export const mockCourseMaterial: ApiCourseMaterial[] = [];

export const mockAssignments: ApiAssignment[] = [
  {
    id: "0",
    class_id: "2",
    name: "Preliminary architecture decisions",
    link: "www.google.com",
  },
  {
    id: "1",
    class_id: "2",
    name: "Architecture styles and tactics",
    link: "www.google.com",
  },
  {
    id: "2",
    class_id: "2",
    name: "Architecture Views",
    link: "www.google.com",
  },
  {
    id: "3",
    class_id: "2",
    name: "Software architecture document",
    link: "www.google.com",
  },
  {
    id: "4",
    class_id: "2",
    name: "Detailed design exercise",
    link: "www.google.com",
  },
  {
    id: "5",
    class_id: "2",
    name: "Software architecture and detailed design",
    link: "www.google.com",
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
