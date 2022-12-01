import React from "react";

import {
  MessageBar,
  MessageBarType,
  Stack,
  Text,
  Theme,
} from "@fluentui/react";

import {
  ApiAssignment,
  ApiAssignmentStatus,
  ApiClass,
  ApiStatusPost,
  ASSIGNMENT_STATUS_URL,
  ASSIGNMENTS_URL,
  AssignmentStatusTypes,
  STATUS_URL,
} from "../api";
import { verticalStackTokens } from "../styles";
import { KanbanColumn } from "./KanbanColumn";

type KanbanBoardProps = {
  selectedClasses: ApiClass[];
  setPage: (page: "home" | "assignment", data?: any) => void;
  theme: Theme;
  token: string;
  userId: string;
};

export const KanbanBoard: React.FC<KanbanBoardProps> = (props) => {
  const [assignments, setAssignments] = React.useState<ApiAssignment[]>([]);
  const [error, setError] = React.useState<string>();
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

  const updateStatus = React.useCallback(
    async (assignment: ApiAssignment, newStatus: AssignmentStatusTypes) => {
      const s: ApiAssignmentStatus = {
        assignment_id: assignment.id,
        user_id: props.userId,
        status: newStatus,
      };
      const post: ApiStatusPost = {
        token: props.token,
        status: s,
      };
      const response = await fetch(STATUS_URL, {
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      if (!response.ok)
        setError(`Failed to update status for assignment "${assignment.name}"`);
      else {
        setStati((old) => [
          ...old.filter((value) => {
            return !(
              value.assignment_id === assignment.id &&
              value.user_id === props.userId
            );
          }),
          s,
        ]);
      }
    },
    [props.token, props.userId]
  );

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">Assignments</Text>
      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={() => setError(undefined)}
        >
          {error}
        </MessageBar>
      )}
      <Stack horizontal horizontalAlign="space-between">
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return stati
              .filter((s) => {
                return s.status === AssignmentStatusTypes.todo;
              })
              .map((s) => {
                return s.assignment_id;
              })
              .includes(a.id);
          })}
          selectedClasses={props.selectedClasses}
          setPage={props.setPage}
          statusType={AssignmentStatusTypes.todo}
          theme={props.theme}
          updateStatus={async (
            assignment: ApiAssignment,
            newStatus: AssignmentStatusTypes
          ) => {
            await updateStatus(assignment, newStatus);
          }}
        />
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return stati
              .filter((s) => {
                return s.status === AssignmentStatusTypes.inwork;
              })
              .map((s) => {
                return s.assignment_id;
              })
              .includes(a.id);
          })}
          selectedClasses={props.selectedClasses}
          setPage={props.setPage}
          statusType={AssignmentStatusTypes.inwork}
          theme={props.theme}
          updateStatus={async (
            assignment: ApiAssignment,
            newStatus: AssignmentStatusTypes
          ) => {
            await updateStatus(assignment, newStatus);
          }}
        />
        <KanbanColumn
          assignments={assignments.filter((a) => {
            return stati
              .filter((s) => {
                return s.status === AssignmentStatusTypes.complete;
              })
              .map((s) => {
                return s.assignment_id;
              })
              .includes(a.id);
          })}
          selectedClasses={props.selectedClasses}
          setPage={props.setPage}
          statusType={AssignmentStatusTypes.complete}
          theme={props.theme}
          updateStatus={async (
            assignment: ApiAssignment,
            newStatus: AssignmentStatusTypes
          ) => {
            await updateStatus(assignment, newStatus);
          }}
        />
      </Stack>
    </Stack>
  );
};
