import { Separator, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiAssignment, AssignmentStatusTypes } from "../api";
import { darkPalette, lightPalette, verticalStackTokens } from "../styles";
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
  darkMode: boolean;
  statusType: AssignmentStatusTypes;
};

export const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  return (
    <Stack
      styles={{
        root: {
          borderBottomWidth: 1,
          borderColor: props.darkMode
            ? darkPalette.themeDark
            : lightPalette.themeDark,
          borderLeftWidth:
            props.statusType !== AssignmentStatusTypes.inwork ? 1 : 0,
          borderRightWidth:
            props.statusType !== AssignmentStatusTypes.inwork ? 1 : 0,
          borderStyle: "solid",
          borderTopWidth: 1,
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
              darkMode={props.darkMode}
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
