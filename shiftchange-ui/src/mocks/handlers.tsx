import { rest } from "msw";
import { BoardType, TicketType } from "../types";
import {
  mockBoards,
  mockColumns,
  mockTicketsBacklog,
  mockTicketsCompleted,
  mockTicketsInProgress,
} from "./mockResponses";

export const handlers = [
  rest.get("/ticket", (req, res, ctx) => {
    const ticketId = req.url.searchParams.get("id");

    if (!ticketId) return res(ctx.status(400, "No ticket ID supplied."));

    const allTickets = [
      ...mockTicketsBacklog,
      ...mockTicketsCompleted,
      ...mockTicketsInProgress,
    ];
    const ticket = allTickets.find((t: TicketType) => {
      return t.id === ticketId;
    });

    if (!ticket)
      return res(ctx.status(404, `Ticket ID ${ticketId} not found.`));
    return res(ctx.status(200), ctx.json(ticket));
  }),

  rest.get("/column", (req, res, ctx) => {
    const columnId = req.url.searchParams.get("id");

    if (!columnId) return res(ctx.status(400, "No column ID supplied."));

    if (columnId === mockColumns[0].id)
      return res(ctx.status(200), ctx.json(mockTicketsBacklog));
    else if (columnId === mockColumns[1].id)
      return res(ctx.status(200), ctx.json(mockTicketsInProgress));
    else if (columnId === mockColumns[2].id)
      return res(ctx.status(200), ctx.json(mockTicketsCompleted));
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
