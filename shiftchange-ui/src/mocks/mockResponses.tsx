import { BoardType, AssignmentType, ColumnType } from "../types";

export const mockBoards: BoardType[] = [
  {
    id: 0,
    title: "ENPM613",
  },
  {
    id: 1,
    title: "ENPM612",
  },
  {
    id: 2,
    title: "ENPM611",
  },
];

export const mockColumns: ColumnType[] = [
  {
    id: "613-0",
    title: "Backlog",
  },
  {
    id: "613-1",
    title: "In Progress",
  },
  {
    id: "613-2",
    title: "Completed",
  },
];

export const mockAssignmentsBacklog: AssignmentType[] = [
  {
    description:
      "Create a board component that queries the API for the columns associated with the board ID and displays the columns using the TicketColumn component.",
    id: "613-3",
    title: "Create Board component",
  },
];

export const mockAssignmentsInProgress: AssignmentType[] = [
  {
    description:
      "Create a column component that queries the API for tickets associated with the column ID and displays them in groups using the Ticket component.",
    id: "613-2",
    title: "Create TicketColumn component",
  },
  {
    description:
      "Create a simple ticket component that displays the information present in the Ticket type definition.",
    id: "613-1",
    title: "Create Ticket component",
  },
];

export const mockAssignmentsCompleted: AssignmentType[] = [
  {
    description:
      "Create a baseline react project with the necessary fluentui and msw packages to begin development.",
    id: "613-0",
    title: "Initialize React Project",
  },
];
