import { mergeStyleSets, Stack, Text } from "@fluentui/react";
import React from "react";
import { appPalette, paddingStyles, verticalStackTokens } from "../styles";
import { AssignmentType } from "../types";

export type AssignmentProps = {
  assignment: AssignmentType;
};

export const Assignment: React.FC<AssignmentProps> = (props) => {
  return (
    <Stack
      styles={mergeStyleSets(paddingStyles, {
        root: { background: appPalette.white },
      })}
      tokens={verticalStackTokens}
    >
      <Text variant="large">
        {props.assignment.id} - {props.assignment.title}
      </Text>
      <Stack>
        <Text variant="medium">{props.assignment.description}</Text>
      </Stack>
    </Stack>
  );
};
