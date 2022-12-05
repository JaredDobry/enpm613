import React from "react";

import {
  ActionButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
} from "@fluentui/react";

import {
  AddRemove,
  ApiAssignment,
  ApiClass,
  ASSIGNMENT_MANAGEMENT_URL,
  ASSIGNMENTS_URL,
} from "../../api";
import { ExpandablePane } from "../../components/ExpandablePane";
import { horizontalStackTokens, verticalStackTokens } from "../../styles";
import { AssignmentAdder } from "./AssignmentAdder";
import { AssignmentRemover } from "./AssignmentRemover";
import { AssignmentStudents } from "./AssignmentStudents";

type AssignmentManagerProps = {
  course: ApiClass;
  token: string;
  userId: string;
};

export const AssignmentManager: React.FC<AssignmentManagerProps> = (props) => {
  const [assignments, setAssignments] = React.useState<ApiAssignment[]>([]);
  const [choppingBlock, setChoppingBlock] = React.useState<ApiAssignment>();
  const [error, setError] = React.useState<string>();
  const [showAdd, setShowAdd] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAssignments = async () => {
      const response = await fetch(ASSIGNMENTS_URL(props.course.id, "class"));
      if (response.ok) setAssignments(await response.json());
      else {
        setAssignments([]);
        console.log(`Error fetching assignments for class ${props.course.id}`);
      }
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
            <ExpandablePane
              key={`dropdown-${value.id}`}
              paneElement={
                <AssignmentRemover
                  assignment={value}
                  token={props.token}
                  setChoppingBlock={setChoppingBlock}
                />
              }
            >
              <AssignmentStudents
                assignment={value}
                course={props.course}
                token={props.token}
                userId={props.userId}
              />
            </ExpandablePane>
          );
        })}
      </Stack>
      <Dialog
        dialogContentProps={{
          title: "Warning",
          subText: `Are you sure you want to delete "${choppingBlock?.name}"? This action is destructive and irreversible.`,
        }}
        hidden={!choppingBlock}
        onDismiss={() => setChoppingBlock(undefined)}
      >
        <DialogFooter>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton
              onClick={() => setChoppingBlock(undefined)}
              text="Cancel"
            />
            <PrimaryButton
              onClick={async () => {
                const response = await fetch(ASSIGNMENT_MANAGEMENT_URL, {
                  body: JSON.stringify({
                    action_type: AddRemove.remove,
                    id: choppingBlock?.id,
                  }),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (response.ok) {
                  setAssignments(
                    assignments.filter((value) => {
                      return value.id !== choppingBlock?.id;
                    })
                  );
                  setChoppingBlock(undefined);
                } else {
                  setError(`Error deleting material ${choppingBlock?.name}`);
                  setChoppingBlock(undefined);
                }
              }}
              text="Delete"
            />
          </Stack>
        </DialogFooter>
      </Dialog>
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
