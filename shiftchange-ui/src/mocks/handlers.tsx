import { rest } from "msw";
import { BoardType, AssignmentType } from "../types";
import {
  mockBoards,
  mockColumns,
  mockAssignmentsBacklog,
  mockAssignmentsCompleted,
  mockAssignmentsInProgress,
} from "./mockResponses";

export const handlers = [
  rest.get("/assignment", (req, res, ctx) => {
    const assignmentId = req.url.searchParams.get("id");

    if (!assignmentId)
      return res(ctx.status(400, "No assignment ID supplied."));

    const allAssignments = [
      ...mockAssignmentsBacklog,
      ...mockAssignmentsCompleted,
      ...mockAssignmentsInProgress,
    ];
    const assignment = allAssignments.find((a: AssignmentType) => {
      return a.id === assignmentId;
    });

    if (!assignment)
      return res(ctx.status(404, `Assignment ID ${assignmentId} not found.`));
    return res(ctx.status(200), ctx.json(assignment));
  }),

  rest.get("/column", (req, res, ctx) => {
    const columnId = req.url.searchParams.get("id");

    if (!columnId) return res(ctx.status(400, "No column ID supplied."));

    if (columnId === mockColumns[0].id)
      return res(ctx.status(200), ctx.json(mockAssignmentsBacklog));
    else if (columnId === mockColumns[1].id)
      return res(ctx.status(200), ctx.json(mockAssignmentsCompleted));
    else if (columnId === mockColumns[2].id)
      return res(ctx.status(200), ctx.json(mockAssignmentsInProgress));
    else return res(ctx.status(404, `Column ID ${columnId} not found.`));
  }),

  rest.get("/board", (req, res, ctx) => {
    const boardId = req.url.searchParams.get("id");
    if (!boardId) return res(ctx.status(400, "No board ID supplied."));

    const board = mockBoards.find((b: BoardType) => {
      return b.id === parseInt(boardId);
    });
    if (!board) res(ctx.status(404, `Board ID ${boardId} not found.`));
    return res(ctx.status(200), ctx.json(mockColumns));
  }),
];
