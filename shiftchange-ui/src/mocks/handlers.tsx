import { rest } from "msw";
import { sha256 } from "sha.js";

import {
  ApiCommentPost,
  ApiLoginPost,
  ApiStatusPost,
  ApiSubmissionPost,
} from "../api";
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
    const login: ApiLoginPost = await req.json();

    const fail = new sha256().update("fail").digest("hex");
    if (login.username === fail) return res(ctx.status(500, "Login failed"));
    else
      return res(
        ctx.status(200),
        ctx.json(
          new sha256()
            .update(login.username)
            .update(login.password)
            .digest("hex")
        )
      );
  }),
  rest.post("/comment", async (req, res, ctx) => {
    const comment: ApiCommentPost = await req.json();

    if (comment.comment.text === "fail")
      return res(ctx.status(500, "Failure uploading comment"));
    else
      return res(
        ctx.status(200),
        ctx.json(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
  }),
  rest.post("/status", async (req, res, ctx) => {
    const status: ApiStatusPost = await req.json();

    if (status.status.assignment_id === "5")
      return res(ctx.status(500, "Failure updating status"));
    else return res(ctx.status(200));
  }),
  rest.post("submission", async (req, res, ctx) => {
    const submission: ApiSubmissionPost = await req.json();

    if (submission.submission.name === "fail")
      return res(ctx.status(500, "Failed to upload submission"));
    else
      return res(
        ctx.status(200),
        ctx.json(`${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`)
      );
  }),
];
