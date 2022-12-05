import { Separator, Stack, Text } from "@fluentui/react";
import React from "react";
import {
  ApiClass,
  ApiEnrollment,
  ENROLLMENTS_URL,
  EnrollmentTypes,
} from "../../api";
import { marginStyles, verticalStackTokens } from "../../styles";
import { ManagementRadioButtons } from "./ManagementRadioButtons";
import { MaterialsManger } from "./MaterialsManager";

type ManagementPageProps = {
  token: string;
  userId: string;
};

export const ManagementPage: React.FC<ManagementPageProps> = (props) => {
  const [enrollments, setEnrollments] = React.useState<ApiEnrollment[]>([]);
  const [selection, setSelection] = React.useState<ApiClass>();

  React.useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await fetch(ENROLLMENTS_URL(props.userId));
      if (response.ok) {
        const data: ApiEnrollment[] = await response.json();
        setEnrollments(
          data.filter((value) => {
            return value.enrollment_type === EnrollmentTypes.professor;
          })
        );
      } else {
        console.log(`Error fetching enrollments for user ${props.userId}`);
      }
    };

    fetchEnrollments();
  }, [props.userId]);

  return (
    <Stack styles={marginStyles} tokens={verticalStackTokens}>
      <Text variant="xxLarge">Class Management</Text>
      <ManagementRadioButtons
        enrollments={enrollments}
        selection={selection}
        setSelected={setSelection}
      />
      {selection && (
        <>
          <Separator />
          <MaterialsManger course={selection} token={props.token} />
        </>
      )}
    </Stack>
  );
};
