import React from "react";

import { Link, Stack, Text } from "@fluentui/react";

import {
  ApiAssignment,
  ApiSubmission,
  ASSIGNMENT_SUBMISSIONS_URL,
} from "../api";
import { verticalStackTokens } from "../styles";
import { SubmissionSelector } from "./SubmissionSelector";

type SubmissionsProps = {
  assignment: ApiAssignment;
  fileUpload: boolean;
  token: string;
  userId: string;
};

export const Submissions: React.FC<SubmissionsProps> = (props) => {
  const [submissions, setSubmissions] = React.useState<ApiSubmission[]>([]);

  React.useEffect(() => {
    const fetchSubmissions = async () => {
      const response = await fetch(
        ASSIGNMENT_SUBMISSIONS_URL(props.assignment.id, props.userId)
      );
      if (!response.ok) {
        console.log(
          `Error fetching submissions for assignment ${props.assignment.id} and user ${props.userId}`
        );
        return;
      }
      setSubmissions(await response.json());
    };

    fetchSubmissions();
  }, [props.assignment, props.userId]);

  const addSubmission = React.useCallback((submission: ApiSubmission) => {
    setSubmissions((old) => [...old, submission]);
  }, []);

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant={props.fileUpload ? "xxLargePlus" : "large"}>
        Submissions
      </Text>

      {submissions.map((submission, idx) => {
        return (
          <Link
            href={submission.link}
            key={`submission-${submission.id}`}
            onClick={() => window.open(submission.link)}
          >
            <Stack>
              <Text variant={props.fileUpload ? "large" : "medium"}>
                #{idx + 1} - {submission.timestamp}
              </Text>
              <Text variant={props.fileUpload ? "large" : "medium"}>
                {submission.name}
              </Text>
            </Stack>
          </Link>
        );
      })}
      {submissions.length === 0 && <Text>No submissions yet!</Text>}
      {props.fileUpload && (
        <SubmissionSelector
          addSubmission={addSubmission}
          assignment={props.assignment}
          submissions={submissions}
          token={props.token}
          userId={props.userId}
        />
      )}
    </Stack>
  );
};
