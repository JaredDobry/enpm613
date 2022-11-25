import { Separator, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiAssignment, AssignmentStatusTypes } from "../api";
import { appPalette, verticalStackTokens } from "../styles";
import { KanbanAssignment } from "./KanbanAssignment";

const getStatusLabel = (statusType: AssignmentStatusTypes) => {
  switch (statusType) {
    case "todo":
      return "To Do";
    case "inwork":
      return "In Work";
    case "complete":
      return "Complete";
  }
};

type KanbanColumnProps = {
  assignments: ApiAssignment[];
  statusType: AssignmentStatusTypes;
};

export const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  return (
    <Stack
      styles={{
        root: {
          border: `thin solid ${appPalette.themeDark}`,
          height: "100%",
          padding: 10,
        },
      }}
    >
      <Text variant="xxLarge">{getStatusLabel(props.statusType)}</Text>
      <Separator />
      <Stack tokens={verticalStackTokens}>
        {props.assignments.map((value) => {
          return (
            <KanbanAssignment
              assignment={value}
              key={`${props.statusType}-${value.id}`}
              showLeft={props.statusType !== AssignmentStatusTypes.todo}
              showRight={props.statusType !== AssignmentStatusTypes.complete}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
