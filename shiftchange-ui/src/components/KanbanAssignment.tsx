import { IconButton, Stack, Text, Theme } from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiClass, CLASS_URL } from "../api";
import { leftIcon, rightIcon } from "../icons";
import { darkPalette, horizontalStackTokens, lightPalette } from "../styles";

type KanbanAssignmentProps = {
  assignment: ApiAssignment;
  selectedClasses: ApiClass[];
  showLeft: boolean;
  showRight: boolean;
  theme: Theme;
};

export const KanbanAssignment: React.FC<KanbanAssignmentProps> = (props) => {
  return (
    <Stack
      horizontal
      styles={{
        root: {
          border: `thin solid ${props.theme.palette.themeDark}`,
          padding: 4,
        },
      }}
      tokens={horizontalStackTokens}
      verticalAlign="center"
    >
      {props.showLeft && <IconButton iconProps={leftIcon} />}
      <Stack.Item grow>
        <Stack>
          <Text>
            {
              props.selectedClasses.find((c) => {
                return c.id === props.assignment.class_id;
              })?.code
            }
          </Text>
          <Text>{props.assignment.name}</Text>
        </Stack>
      </Stack.Item>
      {props.showRight && <IconButton iconProps={rightIcon} />}
    </Stack>
  );
};
