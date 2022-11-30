import { rest } from "msw";
import { sha256 } from "sha.js";
import { ApiComment } from "../api";

import {
  mockAssignments,
  mockClasses,
  mockComments,
  mockCourseMaterial,
  mockEnrollments,
  mockGrades,
  mockStatuses,
  mockSubmissions,
  mockUsers,
} from "./mockResponses";

export const handlers = [
  rest.get("/user/:userId", (req, res, ctx) => {
    const { userId } = req.params;

    const user = mockUsers.find((user) => {
      return user.id === userId;
    });

    if (!user) return res(ctx.status(404, `User ${userId} not found`));
    else return res(ctx.status(200), ctx.json(user));
  }),
  rest.get("/user/:userId/enrollments", (req, res, ctx) => {
    const { userId } = req.params;

    const enrollments = mockEnrollments.filter((value) => {
      return value.user_id === userId;
    });

    if (enrollments.length === 0)
      return res(
        ctx.status(404, `User ${userId} isn't enrolled in any classes`)
      );
    else return res(ctx.status(200), ctx.json(enrollments));
  }),
  rest.get("user/:userId/assignments", (req, res, ctx) => {
    const { userId } = req.params;

    const assignments = mockAssignments.filter((assignment) => {
      return mockEnrollments
        .filter((value) => {
          return value.user_id === userId;
        })
        .map((enrollment) => {
          return enrollment.class_id;
        })
        .includes(assignment.class_id);
    });

    if (assignments.length === 0) {
      return res(ctx.status(404, `User ${userId} has no assignments`));
    } else return res(ctx.status(200), ctx.json(assignments));
  }),
  rest.get("/class/:classId", (req, res, ctx) => {
    const { classId } = req.params;

    const theClass = mockClasses.find((value) => {
      return value.id === classId;
    });

    if (!theClass)
      return res(ctx.status(404, `Class ${classId} doesn't exist`));
    else return res(ctx.status(200), ctx.json(theClass));
  }),
  rest.get("/class/:classId/assignments", (req, res, ctx) => {
    const { classId } = req.params;

    const assignments = mockAssignments.filter((value) => {
      return value.class_id === classId;
    });

    if (assignments.length === 0)
      return res(
        ctx.status(404, `Class ${classId} doesn't have any assignments`)
      );
    else return res(ctx.status(200), ctx.json(assignments));
  }),
  rest.get("/class/:classId/materials", (req, res, ctx) => {
    const { classId } = req.params;

    const materials = mockCourseMaterial.filter((value) => {
      return value.class_id === classId;
    });

    if (materials.length === 0) {
      return res(
        ctx.status(404, `Class ${classId} doesn't have any course materials`)
      );
    } else return res(ctx.status(200), ctx.json(materials));
  }),
  rest.get("/assignment/:assignmentId/status/:userId", (req, res, ctx) => {
    const { assignmentId, userId } = req.params;

    const theStatus = mockStatuses.find((value) => {
      return value.assignment_id === assignmentId && value.user_id === userId;
    });

    if (!theStatus)
      return res(
        ctx.status(
          404,
          `User ${userId} doesn't have a status for assignment ${assignmentId}`
        )
      );
    else return res(ctx.status(200), ctx.json(theStatus));
  }),
  rest.get("/assignment/:assignmentId/comments/:studentId", (req, res, ctx) => {
    const { assignmentId, studentId } = req.params;
    const comments = mockComments.filter((comment) => {
      return (
        comment.assignment_id === assignmentId &&
        comment.student_id === studentId
      );
    });

    if (comments.length === 0)
      return res(
        ctx.status(
          404,
          `Student ${studentId} has no associated comments on assignment ${assignmentId}`
        )
      );
    else return res(ctx.status(200), ctx.json(comments));
  }),
  rest.get("/assignment/:assignmentId/grade/:userId", (req, res, ctx) => {
    const { assignmentId, userId } = req.params;

    const grade = mockGrades.find((g) => {
      return g.assignment_id === assignmentId && g.user_id === userId;
    });

    if (!grade)
      return res(
        ctx.status(
          404,
          `Student ${userId} has no grade on assignment ${assignmentId}`
        )
      );
    else return res(ctx.status(200), ctx.json(grade));
  }),
  rest.get("/assignment/:assignmentId/submissions/:userId", (req, res, ctx) => {
    const { assignmentId, userId } = req.params;

    const subs = mockSubmissions.filter((s) => {
      return s.assignment_id === assignmentId && s.user_id === userId;
    });

    if (subs.length === 0)
      return res(
        ctx.status(
          404,
          `Student ${userId} has no submissions on assignment ${assignmentId}`
        )
      );
    else return res(ctx.status(200), ctx.json(subs));
  }),
  rest.post("/login", async (req, res, ctx) => {
    const encrypted = await req.json();

    const fail = new sha256().update("fail").digest("hex");
    if (encrypted === fail) return res(ctx.status(500, "Login failed"));
    else return res(ctx.status(200), ctx.json(fail));
  }),
  rest.post("/comment", async (req, res, ctx) => {
    const comment: ApiComment = await req.json();
    console.log(comment.text);

    if (comment.text === "fail")
      return res(ctx.status(500, "Failure uploading comment"));
    else
      return res(
        ctx.status(200),
        ctx.json(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
      );
  }),
];

// export const handlers = [
//   rest.get("/assignment", (req, res, ctx) => {
//     const assignmentId = req.url.searchParams.get("id");

//     if (!assignmentId)
//       return res(ctx.status(400, "No assignment ID supplied."));

//     const allAssignments = [
//       ...mockAssignmentsBacklog,
//       ...mockAssignmentsCompleted,
//       ...mockAssignmentsInProgress,
//     ];
//     const assignment = allAssignments.find((a: AssignmentType) => {
//       return a.id === assignmentId;
//     });

//     if (!assignment)
//       return res(ctx.status(404, `Assignment ID ${assignmentId} not found.`));
//     return res(ctx.status(200), ctx.json(assignment));
//   }),

//   rest.get("/column", (req, res, ctx) => {
//     const columnId = req.url.searchParams.get("id");

//     if (!columnId) return res(ctx.status(400, "No column ID supplied."));

//     if (columnId === mockColumns[0].id)
//       return res(ctx.status(200), ctx.json(mockAssignmentsBacklog));
//     else if (columnId === mockColumns[1].id)
//       return res(ctx.status(200), ctx.json(mockAssignmentsCompleted));
//     else if (columnId === mockColumns[2].id)
//       return res(ctx.status(200), ctx.json(mockAssignmentsInProgress));
//     else return res(ctx.status(404, `Column ID ${columnId} not found.`));
//   }),

//   rest.get("/board", (req, res, ctx) => {
//     const boardId = req.url.searchParams.get("id");
//     if (!boardId) return res(ctx.status(400, "No board ID supplied."));

//     const board = mockBoards.find((b: BoardType) => {
//       return b.id === parseInt(boardId);
//     });
//     if (!board) res(ctx.status(404, `Board ID ${boardId} not found.`));
//     return res(ctx.status(200), ctx.json(mockColumns));
//   }),

//   rest.get("/boards", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(mockBoards));
//   }),
// ];
