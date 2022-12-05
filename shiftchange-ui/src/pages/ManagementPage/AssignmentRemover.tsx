import { IconButton, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiCourseMaterial } from "../../api";
import { horizontalStackTokens } from "../../styles";

type AssignmentRemoverProps = {
  assignment: ApiAssignment;
  token: string;
  setChoppingBlock: (a: ApiAssignment) => void;
};

export const AssignmentRemover: React.FC<AssignmentRemoverProps> = (props) => {
  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      key={`assignment-${props.assignment.id}`}
      tokens={horizontalStackTokens}
      verticalAlign="center"
    >
      <Text>{props.assignment.name}</Text>
      <IconButton
        iconProps={{ iconName: "CalculatorSubtract" }}
        onClick={() => props.setChoppingBlock(props.assignment)}
      />
    </Stack>
  );
};
