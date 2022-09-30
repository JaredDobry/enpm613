import { Stack, mergeStyleSets, Text } from "@fluentui/react";
import React from "react";
import {
  ticketColumnStyles,
  verticalStackTokens,
  paddingStyles,
  appPalette,
} from "../styles";
import { TicketColumnType, TicketType } from "../types";
import { Ticket } from "./Ticket";

export type TicketColumnProps = {
  column: TicketColumnType;
};

export const TicketColumn: React.FC<TicketColumnProps> = (props) => {
  const [tickets, setTickets] = React.useState<TicketType[]>();

  React.useEffect(() => {
    const fetchTickets = async () => {
      const response: Response = await fetch(`/column?id=${props.column.id}`);
      if (!response.ok) {
        console.log(
          `Error fetching /column?id=${props.column.id} - ${response.status}:${response.statusText}`
        );
        return;
      }
      const data: TicketType[] = Array.from(await response.json());
      setTickets(data);
    };

    fetchTickets();
  }, [props.column.id]);

  if (!tickets) return null;
  return (
    <Stack
      styles={mergeStyleSets(paddingStyles, ticketColumnStyles, {
        root: { background: appPalette.neutralLight },
      })}
      tokens={verticalStackTokens}
    >
      <Text variant="xLarge">{props.column.title}</Text>
      {tickets.map((ticket: TicketType) => {
        return <Ticket key={ticket.id} ticket={ticket} />;
      })}
    </Stack>
  );
};
