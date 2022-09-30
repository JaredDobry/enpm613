import { mergeStyleSets, Stack, Text } from "@fluentui/react";
import React from "react";
import { appPalette, paddingStyles, verticalStackTokens } from "../styles";
import { TicketType } from "../types";

export type TicketProps = {
  ticket: TicketType;
};

export const Ticket: React.FC<TicketProps> = (props) => {
  return (
    <Stack
      styles={mergeStyleSets(paddingStyles, {
        root: { background: appPalette.white },
      })}
      tokens={verticalStackTokens}
    >
      <Text variant="large">
        {props.ticket.id} - {props.ticket.title}
      </Text>
      <Stack>
        <Text variant="medium">Assignee: {props.ticket.assignee}</Text>
        <Text variant="medium">{props.ticket.description}</Text>
      </Stack>
    </Stack>
  );
};
