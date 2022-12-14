import React from "react";

import { Separator, Stack, Text } from "@fluentui/react";

import {
  ApiClass,
  ApiEnrollment,
  ENROLLMENTS_URL,
  EnrollmentTypes,
} from "../../api";
import {
  horizontalStackTokens,
  marginStyles,
  verticalStackTokens,
} from "../../styles";
import { AssignmentManager } from "./AssignmentManager";
import { ManagementRadioButtons } from "./ManagementRadioButtons";
import { MaterialsManager } from "./MaterialsManager";

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
    <Stack horizontal styles={marginStyles} tokens={horizontalStackTokens}>
      <Stack tokens={verticalStackTokens}>
        <Text variant="xxLarge">Class Management</Text>
        <ManagementRadioButtons
          enrollments={enrollments}
          selection={selection}
          setSelected={setSelection}
        />
        {selection && (
          <>
            <Separator />
            <MaterialsManager course={selection} token={props.token} />
          </>
        )}
      </Stack>
      <Separator vertical />
      {selection && (
        <Stack.Item grow>
          <AssignmentManager
            course={selection}
            token={props.token}
            userId={props.userId}
          />
        </Stack.Item>
      )}
    </Stack>
  );
};
