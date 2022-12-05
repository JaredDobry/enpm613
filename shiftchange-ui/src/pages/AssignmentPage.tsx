import React from "react";

import { IconButton, Separator, Stack, Text, Theme } from "@fluentui/react";

import {
  ApiAssignment,
  ApiClass,
  ApiGrade,
  ASSIGNMENT_GRADE_URL,
} from "../api";
import { Comments } from "../components/Comments";
import { FilePreview } from "../components/FilePreview";
import { Submissions } from "../components/Submissions";
import {
  horizontalStackTokens,
  marginStyles,
  verticalStackTokens,
} from "../styles";

type AssignmentPageProps = {
  assignment: ApiAssignment;
  course: ApiClass;
  theme: Theme;
  token: string;
  userId: string;
};

export const AssignmentPage: React.FC<AssignmentPageProps> = (props) => {
  const [grade, setGrade] = React.useState<ApiGrade>();

  React.useEffect(() => {
    const fetchGrade = async () => {
      const response = await fetch(
        ASSIGNMENT_GRADE_URL(props.assignment.id, props.userId)
      );
      if (!response.ok) {
        console.log(
          `Error fetching grade for assignment ${props.assignment.id} and user ${props.userId}`
        );
        return;
      }
      setGrade(await response.json());
    };

    fetchGrade();
  }, [props.assignment, props.userId]);

  return (
    <Stack horizontal styles={marginStyles} tokens={horizontalStackTokens}>
      <Stack.Item grow>
        <Stack tokens={verticalStackTokens}>
          <Stack horizontal horizontalAlign="space-between">
            <Stack
              horizontal
              tokens={horizontalStackTokens}
              verticalAlign="end"
            >
              <Text variant="xxLargePlus">{props.assignment.name}</Text>
              <IconButton
                ariaLabel="Download assignment"
                iconProps={{ iconName: "Download" }}
                onClick={() => window.open(props.assignment.link)}
              />
            </Stack>
            <Text variant="xxLargePlus">{`Grade: ${
              grade ? grade.grade + "%" : "Ungraded"
            }`}</Text>
          </Stack>

          <Text variant="large">{`${props.course.code}: ${props.course.name}`}</Text>
          {props.assignment.description && (
            <Text>{props.assignment.description}</Text>
          )}
          <FilePreview link={props.assignment.link} theme={props.theme} />
          <Separator />
          <Comments
            assignment={props.assignment}
            token={props.token}
            userId={props.userId}
          />
        </Stack>
      </Stack.Item>
      <Separator vertical />
      <Stack.Item styles={{ root: { minWidth: 400 } }}>
        <Submissions
          assignment={props.assignment}
          fileUpload={true}
          token={props.token}
          userId={props.userId}
        />
      </Stack.Item>
    </Stack>
  );
};
