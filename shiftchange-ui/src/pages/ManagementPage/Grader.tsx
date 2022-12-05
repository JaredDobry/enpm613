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
  TextField,
} from "@fluentui/react";

import {
  ApiGrade,
  ApiGradePost,
  ASSIGNMENT_GRADE_URL,
  GRADE_URL,
} from "../../api";
import { verticalStackTokens } from "../../styles";

type GraderProps = {
  assignmentId: string;
  studentId: string;
  token: string;
};

export const Grader: React.FC<GraderProps> = (props) => {
  const [error, setError] = React.useState<string>();
  const [grade, setGrade] = React.useState<ApiGrade>();
  const [gradeText, setGradeText] = React.useState<string>("");
  const [hidden, setHidden] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchGrade = async () => {
      const response = await fetch(
        ASSIGNMENT_GRADE_URL(props.assignmentId, props.studentId)
      );
      if (!response.ok) {
        console.log(
          `Error fetching grade for assignment ${props.assignmentId} and student ${props.studentId}`
        );
        return;
      }
      setGrade(await response.json());
    };

    fetchGrade();
  }, [props.assignmentId, props.studentId]);

  return (
    <>
      <Stack tokens={verticalStackTokens}>
        <Text variant="large">Grade: {grade ? grade.grade : "Ungraded"}</Text>
        <Stack horizontal>
          <ActionButton
            iconProps={{ iconName: "EditNote" }}
            onClick={() => setHidden(false)}
            text="Change Grade"
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
      </Stack>
      <Dialog
        dialogContentProps={{
          title: "Update Grade",
          subText: "Warning: This action will take place immediately!",
        }}
        hidden={hidden}
      >
        <TextField
          onChange={(event, newValue) => {
            if (!newValue) {
              setGradeText("");
              return;
            }
            const floatText = newValue.match(
              /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/
            );
            if (!floatText) {
              setGradeText("");
              return;
            }
            setGradeText(floatText[0]);
          }}
          onGetErrorMessage={(value) => {
            if (value.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/)) {
              const num = Number(value);
              if (num > 100) return "Grade cannot be over 100%";
              if (num < 0) return "Grade cannot be negative";
              return "";
            } else return "A grade is required";
          }}
          required
          value={gradeText}
        />
        <DialogFooter>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton
              onClick={() => {
                setGradeText("");
                setHidden(true);
              }}
              text="Cancel"
            />
            <PrimaryButton
              onClick={async () => {
                if (!gradeText.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/))
                  return;
                const num = Number(gradeText);
                const grade: ApiGradePost = {
                  assignment_id: props.assignmentId,
                  student_id: props.studentId,
                  token: props.token,
                  grade: num,
                };

                const response = await fetch(GRADE_URL, {
                  body: JSON.stringify(grade),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (!response.ok) {
                  setError(
                    `Error updating grade for student ${props.studentId} on assignment ${props.assignmentId}`
                  );
                  setGradeText("");
                  setHidden(true);
                  return;
                }
                setGrade({
                  assignment_id: props.assignmentId,
                  user_id: props.studentId,
                  grade: num,
                });
                setGradeText("");
                setHidden(true);
              }}
              text="Update"
            />
          </Stack>
        </DialogFooter>
      </Dialog>
    </>
  );
};
