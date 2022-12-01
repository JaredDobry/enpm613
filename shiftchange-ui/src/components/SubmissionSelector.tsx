import React from "react";

import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
} from "@fluentui/react";

import {
  ApiAssignment,
  ApiSubmission,
  ApiSubmissionPost,
  SUBMISSION_URL,
} from "../api";

type SubmissionSelectorProps = {
  addSubmission: (submission: ApiSubmission) => void;
  assignment: ApiAssignment;
  submissions: ApiSubmission[];
  token: string;
  userId: string;
};

export const SubmissionSelector: React.FC<SubmissionSelectorProps> = (
  props
) => {
  const [error, setError] = React.useState<string>();
  const [file, setFile] = React.useState<File>();

  return (
    <>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <input
          onChange={(event) => {
            if (event.target.files && event.target.files.length >= 1)
              setFile(event.target.files[0]);
          }}
          type="file"
        />
        <PrimaryButton
          onClick={async () => {
            if (file) {
              let sub = {
                id: "",
                assignment_id: props.assignment.id,
                user_id: props.userId,
                link: "",
                name: file.name,
                timestamp: new Date().toLocaleString(),
              };
              const submission: ApiSubmissionPost = {
                blob: await file.text(),
                submission: sub,
                token: props.token,
              };

              const response = await fetch(SUBMISSION_URL, {
                body: JSON.stringify(submission),
                headers: { "Content-Type": "application/json" },
                method: "POST",
              });

              if (!response.ok) setError(`Error submitting file ${file.name}`);
              else {
                sub.id = await response.json();
                props.addSubmission(sub);
              }
            }
          }}
          text="Submit"
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
    </>
  );
};
