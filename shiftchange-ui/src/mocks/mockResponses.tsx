import { BoardType, TicketType, TicketColumnType } from "../types";

export const mockBoards: BoardType[] = [
  {
    id: 0,
    title: "ENPM809K",
  },
  {
    id: 1,
    title: "Jared's Personal Board",
  },
  {
    id: 2,
    title: "Diane's Personal Board",
  },
  {
    id: 3,
    title: "Hyun's Personal Board",
  },
  {
    id: 4,
    title: "Wei-Lun's Personal Board",
  },
];

export const mockColumns: TicketColumnType[] = [
  {
    id: "809K-0",
    title: "Backlog",
  },
  {
    id: "809K-1",
    title: "In Progress",
  },
  {
    id: "809K-2",
    title: "Completed",
  },
];

export const mockTicketsBacklog: TicketType[] = [
  {
    assignee: "Diane Ditko",
    description:
      "Create a board component that queries the API for the columns associated with the board ID and displays the columns using the TicketColumn component.",
    id: "809K-3",
    title: "Create Board component",
  },
];

export const mockTicketsInProgress: TicketType[] = [
  {
    assignee: "Wei-Lun Hsu",
    description:
      "Create a column component that queries the API for tickets associated with the column ID and displays them in groups using the Ticket component.",
    id: "809K-2",
    title: "Create TicketColumn component",
  },
  {
    assignee: "Hyun Choi",
    description:
      "Create a simple ticket component that displays the information present in the Ticket type definition.",
    id: "809K-1",
    title: "Create Ticket component",
  },
];

export const mockTicketsCompleted: TicketType[] = [
  {
    assignee: "Jared Dobry",
    description:
      "Create a baseline react project with the necessary fluentui and msw packages to begin development.",
    id: "809K-0",
    title: "Initialize React Project",
  },
];
