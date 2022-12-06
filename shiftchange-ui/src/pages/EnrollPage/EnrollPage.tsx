import React from "react";

import { Separator, Stack, Text } from "@fluentui/react";

import {
  ApiClass,
  ApiEnrollment,
  CLASSES_URL,
  ENROLLMENTS_URL,
} from "../../api";
import { marginStyles, verticalStackTokens } from "../../styles";
import { EnrollmentAdder } from "./EnrollmentAdder";
import { EnrollmentRemover } from "./EnrollmentRemover";

type EnrollPageProps = {
  token: string;
  userId: string;
};

export const EnrollPage: React.FC<EnrollPageProps> = (props) => {
  const [classes, setClasses] = React.useState<ApiClass[]>([]);
  const [enrollments, setEnrollments] = React.useState<ApiEnrollment[]>([]);

  React.useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch(CLASSES_URL);
      if (!response.ok) {
        console.log(`Error fetching classes`);
        return;
      }
      setClasses(await response.json());
    };

    fetchClasses();
  }, []);

  React.useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await fetch(ENROLLMENTS_URL(props.userId));
      if (!response.ok) {
        console.log(`Error fetching enrollments for user ${props.userId}`);
        return;
      }
      setEnrollments(await response.json());
    };

    fetchEnrollments();
  }, [props.userId]);

  return (
    <Stack styles={marginStyles} tokens={verticalStackTokens}>
      <Text variant="xxLarge">Current Enrollments</Text>
      {enrollments.map((e) => {
        return (
          <EnrollmentRemover
            course={classes.find((c) => {
              return c.id === e.class_id;
            })}
            enrollment={e}
            key={`enrollment-${e.class_id}-${e.user_id}`}
            removeEnrollment={(class_id) => {
              setEnrollments(
                enrollments.filter((en) => {
                  return en.class_id !== class_id;
                })
              );
            }}
            token={props.token}
            userId={props.userId}
          />
        );
      })}
      <Separator />
      <Text variant="xxLarge">Available Courses</Text>
      {classes
        .filter((c) => {
          return (
            enrollments
              .map((e) => {
                return e.class_id;
              })
              .includes(c.id) === false
          );
        })
        .map((c) => {
          return (
            <EnrollmentAdder
              addEnrollment={(e) => {
                setEnrollments((old) => [...old, e]);
              }}
              course={c}
              key={`available_enrollment-${c.id}`}
              token={props.token}
              userId={props.userId}
            />
          );
        })}
    </Stack>
  );
};
