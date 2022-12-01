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
    description:
      "TEAM SUBMISSION (Not graded, but mandatory) - only one member of each team needs to submit on behalf of the team. Submit an MS Word or pdf file, containing major architecture decisions and a sketch of your system's preliminary architecture, including: System name and description– a high-level, brief description of your system. Features list and description– the list of features that will be implemented. This can be the list of high priority features in your Requirements Analysis documentation, or a refined/updated version of it, if/as needed. Keep in mind that you will need to design your software, implement it, and test it, so that it realizes these features. Preliminary, major architectural design decisions. Include a simple trade-off analysis for candidate technologies (toolkits, frameworks, APIs, DBMS, etc.) – see template and example discussed in class. List the technologies selected as a result of your trade-off analysis and document your decisions. Include advantage and disadvantages of the selected technologies to your specific product/project. For the risks you identify for each of your selected technology/tools, develop mitigations, and document them in the “Project Management” workbook (“Risk Management” worksheet). Identify major architectural elements and their relations– documented in diagrams, using a notation and tool of your choice (e.g., PowerPoint, Visio, a UML tool, etc.) and textual description of responsibilities for each architectural element.",
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
    name: "jdobry_preliminary_architecture_decisions.docx",
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
