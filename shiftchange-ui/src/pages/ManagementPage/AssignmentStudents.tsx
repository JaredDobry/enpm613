import { Stack } from "@fluentui/react";
import React from "react";
import {
  ApiAssignment,
  ApiClass,
  ApiEnrollment,
  CLASS_ENROLLMENTS_URL,
  EnrollmentTypes,
} from "../../api";
import { verticalStackTokens } from "../../styles";
import { AssignmentStudent } from "./AssignmentStudent";

type AssignmentStudentsProps = {
  assignment: ApiAssignment;
  course: ApiClass;
  token: string;
  userId: string;
};

export const AssignmentStudents: React.FC<AssignmentStudentsProps> = (
  props
) => {
  const [students, setStudents] = React.useState<ApiEnrollment[]>([]);

  React.useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await fetch(CLASS_ENROLLMENTS_URL(props.course.id));
      if (!response.ok) {
        console.log(`Error fetching enrollments for class ${props.course.id}`);
        return;
      }
      const data: ApiEnrollment[] = await response.json();
      setStudents(
        data.filter((value) => {
          return value.enrollment_type === EnrollmentTypes.student;
        })
      );
    };

    fetchEnrollments();
  }, [props.course]);

  return (
    <Stack tokens={verticalStackTokens}>
      {students.map((value) => {
        return (
          <AssignmentStudent
            key={`assignment-${props.assignment.id}-student-${value.user_id}`}
            assignment={props.assignment}
            studentId={value.user_id}
            token={props.token}
            userId={props.userId}
          />
        );
      })}
    </Stack>
  );
};
