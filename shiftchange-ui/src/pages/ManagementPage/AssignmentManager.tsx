import {
  ActionButton,
  MessageBar,
  MessageBarType,
  Stack,
  Text,
} from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiClass, ASSIGNMENTS_URL } from "../../api";
import { ExpandablePane } from "../../components/ExpandablePane";
import { horizontalStackTokens, verticalStackTokens } from "../../styles";
import { AssignmentAdder } from "./AssignmentAdder";

type AssignmentManagerProps = {
  course: ApiClass;
  token: string;
};

export const AssignmentManager: React.FC<AssignmentManagerProps> = (props) => {
  const [assignments, setAssignments] = React.useState<ApiAssignment[]>([]);
  const [error, setError] = React.useState<string>();
  const [showAdd, setShowAdd] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch(ASSIGNMENTS_URL(props.course.id, "class"));
      if (response.ok) setAssignments(await response.json());
      else
        console.log(`Error fetching assignments for class ${props.course.id}`);
    };

    fetchAssignments();
  }, [props.course]);

  return (
    <>
      <Stack tokens={verticalStackTokens}>
        <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
          <Text variant="xxLarge">Assignments</Text>
          <ActionButton
            iconProps={{ iconName: "Add" }}
            onClick={() => setShowAdd(true)}
            text="Upload Assignment"
          />
        </Stack>
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => setError(undefined)}
          >
            {error}
          </MessageBar>
        )}
        {assignments.map((value) => {
          return (
            <ExpandablePane key={`dropdown-${value.id}`} label={value.name}>
              <Text>Hello world</Text>
            </ExpandablePane>
          );
        })}
      </Stack>
      <AssignmentAdder
        addAssignment={(a) => setAssignments((old) => [...old, a])}
        course={props.course}
        setError={setError}
        setShow={setShowAdd}
        show={showAdd}
        token={props.token}
      />
    </>
  );
};
