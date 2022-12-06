import { IconButton, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiClass, ApiEnrollment } from "../../api";
import { horizontalStackTokens } from "../../styles";

type EnrollmentRemoverProps = {
  course?: ApiClass;
  enrollment: ApiEnrollment;
};

export const EnrollmentRemover: React.FC<EnrollmentRemoverProps> = (props) => {
  if (!props.course) return null;
  return (
    <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
      <IconButton iconProps={{ iconName: "CalculatorSubtract" }} />
      <Stack>
        <Text>
          {props.course.code}: {props.course.name}
        </Text>
        <Text>Enrolled as: {props.enrollment.enrollment_type}</Text>
      </Stack>
    </Stack>
  );
};
