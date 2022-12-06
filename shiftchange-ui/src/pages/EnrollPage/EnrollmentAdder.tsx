import React from "react";

import {
  ChoiceGroup,
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
  EnrollmentTypes,
} from "../../api";
import { horizontalStackTokens, verticalStackTokens } from "../../styles";

type EnrollmentAdderProps = {
  addEnrollment: (e: ApiEnrollment) => void;
  course: ApiClass;
  token: string;
  userId: string;
};

export const EnrollmentAdder: React.FC<EnrollmentAdderProps> = (props) => {
  const [error, setError] = React.useState<string>();
  const [hidden, setHidden] = React.useState<boolean>(true);
  const [key, setKey] = React.useState<string>();

  return (
    <>
      <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
        <IconButton
          iconProps={{ iconName: "Add" }}
          onClick={() => setHidden(false)}
        />
        <Text>
          {props.course.code}: {props.course.name}
        </Text>
      </Stack>
      <Dialog
        dialogContentProps={{
          title: `Enrolling in course ${props.course.code}`,
        }}
        hidden={hidden}
      >
        <Stack tokens={verticalStackTokens}>
          <Text variant="large">Enroll as:</Text>
          <ChoiceGroup
            onChange={(event, option) => {
              if (option) setKey(option.key);
            }}
            options={[
              {
                key: "student",
                text: "Student",
              },
              {
                key: "professor",
                text: "Professor",
              },
            ]}
            required
            value={key}
          />
          {error && (
            <MessageBar
              messageBarType={MessageBarType.error}
              onDismiss={() => setError(undefined)}
            >
              {error}
            </MessageBar>
          )}
        </Stack>
        <DialogFooter>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton
              onClick={() => {
                setKey(undefined);
                setHidden(true);
              }}
              text="Cancel"
            />
            <PrimaryButton
              onClick={async () => {
                if (!key) {
                  setError("Select either student or professor");
                  return;
                }
                const post: ApiEnrollPost = {
                  action_type: AddRemove.add,
                  enrollment_type: key === "student" ? "student" : "professor",
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
                  setError(`Error enrolling in class ${props.course.code}`);
                } else {
                  setHidden(true);
                  props.addEnrollment({
                    class_id: props.course.id,
                    user_id: props.userId,
                    enrollment_type:
                      key === "student"
                        ? EnrollmentTypes.student
                        : EnrollmentTypes.professor,
                  });
                }
              }}
              text="Enroll"
            />
          </Stack>
        </DialogFooter>
      </Dialog>
    </>
  );
};
