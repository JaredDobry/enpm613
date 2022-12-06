import React from "react";

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  IconButton,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
} from "@fluentui/react";

import {
  AddRemove,
  ApiClass,
  ApiEnrollment,
  ApiEnrollPost,
  ENROLL_URL,
} from "../../api";
import { horizontalStackTokens } from "../../styles";

type EnrollmentRemoverProps = {
  course?: ApiClass;
  enrollment: ApiEnrollment;
  removeEnrollment: (class_id: string) => void;
  token: string;
  userId: string;
};

export const EnrollmentRemover: React.FC<EnrollmentRemoverProps> = (props) => {
  const [error, setError] = React.useState<string>();
  const [hidden, setHidden] = React.useState<boolean>(true);

  if (!props.course) return null;
  return (
    <>
      <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
        <IconButton
          iconProps={{ iconName: "CalculatorSubtract" }}
          onClick={() => setHidden(false)}
        />
        <Stack>
          <Text>
            {props.course.code}: {props.course.name}
          </Text>
          <Text>Enrolled as: {props.enrollment.enrollment_type}</Text>
        </Stack>
      </Stack>
      <Dialog
        dialogContentProps={{
          title: "Warning",
          subText: `Are you sure you want to unenroll from ${props.course.code}? This action is destructive and irreversible. Any assignment statuses, submissions, and comments you have created/modified for this class will be deleted!`,
        }}
        hidden={hidden}
      >
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => setError(undefined)}
          >
            {error}
          </MessageBar>
        )}
        <DialogFooter>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton onClick={() => setHidden(true)} text="Cancel" />
            <PrimaryButton
              onClick={async () => {
                if (!props.course) return;
                const post: ApiEnrollPost = {
                  action_type: AddRemove.remove,
                  class_id: props.course.id,
                  user_id: props.userId,
                  token: props.token,
                };

                const response = await fetch(ENROLL_URL, {
                  body: JSON.stringify(post),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (!response.ok) {
                  setError(`Error unenrolling from class ${props.course.code}`);
                } else {
                  setHidden(true);
                  props.removeEnrollment(props.course.id);
                }
              }}
              text="Unenroll"
            />
          </Stack>
        </DialogFooter>
      </Dialog>
    </>
  );
};
