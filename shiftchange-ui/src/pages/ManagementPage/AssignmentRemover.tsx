import { IconButton, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiAssignment } from "../../api";
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
      key={`assignment-${props.assignment.id}`}
      tokens={horizontalStackTokens}
      verticalAlign="center"
    >
      <IconButton
        iconProps={{ iconName: "CalculatorSubtract" }}
        onClick={() => props.setChoppingBlock(props.assignment)}
      />
      <Text>{props.assignment.name}</Text>
    </Stack>
  );
};
