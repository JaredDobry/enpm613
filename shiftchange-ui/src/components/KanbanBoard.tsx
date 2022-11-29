import React from "react";

import { Stack, Text, Theme } from "@fluentui/react";

import {
  ApiAssignment,
  ApiAssignmentStatus,
  ApiClass,
  ASSIGNMENT_STATUS_URL,
  ASSIGNMENTS_URL,
  AssignmentStatusTypes,
} from "../api";
import { verticalStackTokens } from "../styles";
import { KanbanColumn } from "./KanbanColumn";

type KanbanBoardProps = {
  selectedClasses: ApiClass[];
  theme: Theme;
  userId: string;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = (props) => {
  const [assignments, setAssignments] = React.useState<ApiAssignment[]>([]);
  const [stati, setStati] = React.useState<ApiAssignmentStatus[]>([]);

  React.useEffect(() => {
    const fetchAssignments = async () => {
      if (!props.selectedClasses) return;
      const response = await fetch(ASSIGNMENTS_URL(props.userId, "user"));
      if (!response.ok) {
        console.log(`Error fetching assignments for user ${props.userId}`);
        return;
      }
      const data: ApiAssignment[] = await response.json();
      setAssignments(
        data.filter((value) => {
          return props.selectedClasses
            .map((c) => {
              return c.id;
            })
            .includes(value.class_id);
        })
      );
    };

    fetchAssignments();
  }, [props.selectedClasses, props.userId]);

  React.useEffect(() => {
    const fetchStati = async () => {
      setStati(
        await Promise.all(
          assignments.map(async (assignment): Promise<ApiAssignmentStatus> => {
            const response = await fetch(
              ASSIGNMENT_STATUS_URL(assignment.id, props.userId)
            );
            if (!response.ok)
              throw Error(
                `Error fetching status for assignment ${assignment.id} and user ${props.userId}`
              );
            return await response.json();
          })
        )
      );
    };

    fetchStati();
  }, [assignments, props.userId]);

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">Assignments</Text>
      <Stack horizontal horizontalAlign="space-between">
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return (
              a.id in
              stati
                .filter((s) => {
                  return s.status === AssignmentStatusTypes.todo;
                })
                .map((s) => {
                  return s.assignment_id;
                })
            );
          })}
          selectedClasses={props.selectedClasses}
          statusType={AssignmentStatusTypes.todo}
          theme={props.theme}
        />
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return (
              a.id in
              stati
                .filter((s) => {
                  return s.status === AssignmentStatusTypes.inwork;
                })
                .map((s) => {
                  return s.assignment_id;
                })
            );
          })}
          selectedClasses={props.selectedClasses}
          statusType={AssignmentStatusTypes.inwork}
          theme={props.theme}
        />
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return (
              a.id in
              stati
                .filter((s) => {
                  return s.status === AssignmentStatusTypes.complete;
                })
                .map((s) => {
                  return s.assignment_id;
                })
            );
          })}
          selectedClasses={props.selectedClasses}
          statusType={AssignmentStatusTypes.complete}
          theme={props.theme}
        />
      </Stack>
    </Stack>
  );
};
