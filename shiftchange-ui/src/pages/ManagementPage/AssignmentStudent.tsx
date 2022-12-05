import React from "react";

import { Separator, Text } from "@fluentui/react";

import { ApiAssignment, ApiUser, USER_URL } from "../../api";
import { Comments } from "../../components/Comments";
import { ExpandablePane } from "../../components/ExpandablePane";
import { Submissions } from "../../components/Submissions";
import { Grader } from "./Grader";

type AssignmentStudentProps = {
  assignment: ApiAssignment;
  studentId: string;
  token: string;
  userId: string;
};

export const AssignmentStudent: React.FC<AssignmentStudentProps> = (props) => {
  const [student, setStudent] = React.useState<ApiUser>();

  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(USER_URL(props.studentId));
      if (!response.ok) {
        console.log(`Error fetching user ${props.studentId}`);
        return;
      }
      setStudent(await response.json());
    };

    fetchUser();
  }, [props.studentId]);

  if (!student) return null;

  return (
    <ExpandablePane paneElement={<Text>{student.name}</Text>}>
      <Grader
        assignmentId={props.assignment.id}
        studentId={props.studentId}
        token={props.token}
      />
      <Separator />
      <Submissions
        assignment={props.assignment}
        fileUpload={false}
        token={props.token}
        userId={props.studentId}
      />
      <Separator />
      <Comments
        assignment={props.assignment}
        token={props.token}
        userId={props.userId}
      />
      <Separator />
    </ExpandablePane>
  );
};
