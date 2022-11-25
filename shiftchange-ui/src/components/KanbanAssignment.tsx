import { IconButton, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiClass, CLASS_URL } from "../api";
import { leftIcon, rightIcon } from "../icons";
import { appPalette, horizontalStackTokens } from "../styles";

type KanbanAssignmentProps = {
  assignment: ApiAssignment;
  showLeft: boolean;
  showRight: boolean;
};

export const KanbanAssignment: React.FC<KanbanAssignmentProps> = (props) => {
  const [classCode, setClassCode] = React.useState<string>();

  React.useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch(CLASS_URL(props.assignment.class_id));
      if (response.ok) {
        const data: ApiClass = await response.json();
        setClassCode(data.code);
      } else console.log(`Error fetching class ${props.assignment.class_id}`);
    };
    fetchClass();
  }, [props.assignment]);

  if (!classCode) return null;

  return (
    <Stack
      horizontal
      styles={{
        root: {
          backgroundColor: appPalette.white,
          border: `thin solid ${appPalette.themeDark}`,
          padding: 4,
        },
      }}
      tokens={horizontalStackTokens}
      verticalAlign="center"
    >
      {props.showLeft && <IconButton iconProps={leftIcon} />}
      <Stack.Item grow>
        <Stack>
          <Text>{classCode}</Text>
          <Text>{props.assignment.name}</Text>
        </Stack>
      </Stack.Item>
      {props.showRight && <IconButton iconProps={rightIcon} />}
    </Stack>
  );
};
