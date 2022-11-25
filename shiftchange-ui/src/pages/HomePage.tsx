import { Separator, Stack } from "@fluentui/react";
import React from "react";
import {
  ApiAssignment,
  ApiAssignmentStatus,
  AssignmentStatusTypes,
  ASSIGNMENTS_URL,
  ASSIGNMENT_STATUS_URL,
} from "../api";
import { ClassesDropdown } from "../components/ClassesDropdown";
import { KanbanColumn } from "../components/KanbanColumn";
import { horizontalStackTokens } from "../styles";

type HomePageProps = {
  userId: string;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const [classes, setClasses] = React.useState<string[]>([]);
  const [assignments, setAssignments] = React.useState<ApiAssignment[]>([]);
  const [assignmentStatuses, setAssignmentStatuses] = React.useState<
    ApiAssignmentStatus[]
  >([]);
  const [filteredAssignments, setFilteredAssignments] = React.useState<{
    todos: string[];
    inworks: string[];
    completes: string[];
  }>({ todos: [], inworks: [], completes: [] });

  React.useEffect(() => {
    const fetchAssignments = async () => {
      setAssignments([]);
      setAssignmentStatuses([]);
      classes.forEach(async (classId) => {
        const response = await fetch(ASSIGNMENTS_URL(classId, "class"));
        if (response.ok) {
          const data: ApiAssignment[] = await response.json();
          data.forEach(async (assignment) => {
            const sResponse = await fetch(
              ASSIGNMENT_STATUS_URL(assignment.id, props.userId)
            );
            if (sResponse.ok) {
              const sData: ApiAssignmentStatus = await sResponse.json();
              setAssignments((old) => [...old, assignment]);
              setAssignmentStatuses((old) => [...old, sData]);
            } else
              console.log(
                `Error fetching status for user ${props.userId} on assignment ${assignment.id}`
              );
          });
        } else console.log(`Error fetching class ${classId}`);
      });
    };

    fetchAssignments();
  }, [classes, props.userId]);

  React.useEffect(() => {
    const todos = assignmentStatuses
      .filter((status) => {
        return status.status === AssignmentStatusTypes.todo;
      })
      .map((value) => {
        return value.assignment_id;
      });
    const inworks = assignmentStatuses
      .filter((status) => {
        return status.status === AssignmentStatusTypes.inwork;
      })
      .map((value) => {
        return value.assignment_id;
      });
    const completes = assignmentStatuses
      .filter((status) => {
        return status.status === AssignmentStatusTypes.complete;
      })
      .map((value) => {
        return value.assignment_id;
      });
    setFilteredAssignments({
      todos: todos,
      inworks: inworks,
      completes: completes,
    });
  }, [assignments, assignmentStatuses]);

  return (
    <Stack verticalFill>
      <ClassesDropdown
        userId={props.userId}
        setClasses={(classes: string[]) => setClasses(classes)}
      />
      <Separator />
      <Stack horizontal horizontalAlign="space-between" verticalFill>
        <Stack.Item grow>
          <KanbanColumn
            assignments={assignments.filter((value) => {
              return (
                filteredAssignments.todos.find((id) => {
                  return id === value.id;
                }) !== undefined
              );
            })}
            statusType={AssignmentStatusTypes.todo}
          />
        </Stack.Item>
        <Stack.Item grow>
          <KanbanColumn
            assignments={assignments.filter((value) => {
              return value.id in filteredAssignments.inworks;
            })}
            statusType={AssignmentStatusTypes.inwork}
          />
        </Stack.Item>
        <Stack.Item grow>
          <KanbanColumn
            assignments={assignments.filter((value) => {
              return value.id in filteredAssignments.completes;
            })}
            statusType={AssignmentStatusTypes.complete}
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};
