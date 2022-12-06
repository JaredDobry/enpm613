import { IconButton, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiClass } from "../../api";
import { horizontalStackTokens } from "../../styles";

type EnrollmentAdderProps = {
  course: ApiClass;
};

export const EnrollmentAdder: React.FC<EnrollmentAdderProps> = (props) => {
  return (
    <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
      <IconButton iconProps={{ iconName: "Add" }} onClick={() => {}} />
      <Text>
        {props.course.code}: {props.course.name}
      </Text>
    </Stack>
  );
};
