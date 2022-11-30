import { Separator, Stack, Text, Theme } from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiClass } from "../api";
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
  userId: string;
};

export const AssignmentPage: React.FC<AssignmentPageProps> = (props) => {
  return (
    <Stack horizontal tokens={horizontalStackTokens}>
      <Stack.Item grow>
        <Stack styles={marginStyles} tokens={verticalStackTokens}>
          <Text variant="xxLargePlus">{props.assignment.name}</Text>
          <Text variant="large">{`${props.course.code}: ${props.course.name}`}</Text>
          <FilePreview link={props.assignment.link} theme={props.theme} />
          <Separator />
          <Comments assignment={props.assignment} userId={props.userId} />
        </Stack>
      </Stack.Item>
      <Separator vertical />
      <Stack.Item styles={{ root: { minWidth: 400 } }}>
        <Submissions />
      </Stack.Item>
    </Stack>
  );
};
