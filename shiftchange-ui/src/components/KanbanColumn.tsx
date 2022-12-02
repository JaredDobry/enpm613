import React from "react";

import { Separator, Stack, Text, Theme } from "@fluentui/react";

import { ApiAssignment, ApiClass, AssignmentStatusTypes } from "../api";
import { verticalStackTokens } from "../styles";
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
  selectedClasses: ApiClass[];
  setPage: (page: "home" | "assignment", data?: any) => void;
  statusType: AssignmentStatusTypes;
  theme: Theme;
  updateStatus: (
    assignment: ApiAssignment,
    newStatus: AssignmentStatusTypes
  ) => void;
};

export const KanbanColumn: React.FC<KanbanColumnProps> = (props) => {
  return (
    <Stack
      styles={{
        root: {
          borderBottomWidth: 1,
          borderColor: props.theme.palette.themeDark,
          borderLeftWidth:
            props.statusType !== AssignmentStatusTypes.inwork ? 1 : 0,
          borderRightWidth:
            props.statusType !== AssignmentStatusTypes.inwork ? 1 : 0,
          borderStyle: "solid",
          borderTopWidth: 1,
          minHeight: 500,
          padding: 10,
          width: "calc(100vw - 20px)",
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
              onLeft={() => {
                props.updateStatus(
                  value,
                  props.statusType === AssignmentStatusTypes.inwork
                    ? AssignmentStatusTypes.todo
                    : AssignmentStatusTypes.inwork
                );
              }}
              onRight={() => {
                props.updateStatus(
                  value,
                  props.statusType === AssignmentStatusTypes.inwork
                    ? AssignmentStatusTypes.complete
                    : AssignmentStatusTypes.inwork
                );
              }}
              selectedClasses={props.selectedClasses}
              setPage={props.setPage}
              showLeft={props.statusType !== AssignmentStatusTypes.todo}
              showRight={props.statusType !== AssignmentStatusTypes.complete}
              statusType={props.statusType}
              theme={props.theme}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
