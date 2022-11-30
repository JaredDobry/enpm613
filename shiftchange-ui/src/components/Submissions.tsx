import { Link, Stack, Text } from "@fluentui/react";
import React from "react";
import {
  ApiAssignment,
  ApiSubmission,
  ASSIGNMENT_SUBMISSIONS_URL,
} from "../api";
import { verticalStackTokens } from "../styles";
import { SubmissionSelector } from "./SubmissionSelector";

type SubmissionsProps = {
  assignment: ApiAssignment;
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

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLargePlus">Submissions</Text>
      {submissions.map((submission, idx) => {
        return (
          <Link href={submission.link} key={`submission-${submission.id}`}>
            <Text variant="large">
              #{idx + 1} - {submission.timestamp}
            </Text>
          </Link>
        );
      })}
      <SubmissionSelector />
    </Stack>
  );
};
