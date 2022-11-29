import React from "react";

import { Separator, Stack, Theme } from "@fluentui/react";

import { ApiClass, ApiEnrollment, CLASS_URL, ENROLLMENTS_URL } from "../api";
import { ClassMaterials } from "../components/ClassMaterials";
import { ClassSelector } from "../components/ClassSelector";
import { KanbanBoard } from "../components/KanbanBoard";
import { marginStyles, verticalStackTokens } from "../styles";

type HomePageProps = {
  setPage: (page: "home" | "assignment", data?: any) => void;
  theme: Theme;
  userId: string;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const [classes, setClasses] = React.useState<ApiClass[]>();
  const [enrollments, setEnrollments] = React.useState<ApiEnrollment[]>();
  const [selectedClasses, setSelectedClasses] = React.useState<ApiClass[]>([]);

  React.useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await fetch(ENROLLMENTS_URL(props.userId));
      if (!response.ok) {
        console.log(`Error fetching enrollments for user ${props.userId}`);
        return;
      }
      const data: ApiEnrollment[] = await response.json();
      setEnrollments(data);
    };

    fetchEnrollments();
  }, [props.userId]);

  React.useEffect(() => {
    const fetchClasses = async () => {
      if (!enrollments) return;
      const newClasses = await Promise.all(
        enrollments.map(
          async (enrollment: ApiEnrollment): Promise<ApiClass> => {
            const response = await fetch(CLASS_URL(enrollment.class_id));
            if (!response.ok) {
              throw Error(`Error fetching class ${enrollment.class_id}`);
            }
            return await response.json();
          }
        )
      );
      setClasses(newClasses);
      setSelectedClasses(newClasses);
    };

    fetchClasses();
  }, [enrollments]);

  return (
    <Stack styles={marginStyles} tokens={verticalStackTokens} verticalFill>
      <ClassSelector
        classes={classes}
        selectedClasses={selectedClasses}
        setSelectedClasses={setSelectedClasses}
      />
      <Separator />
      <KanbanBoard
        selectedClasses={selectedClasses}
        setPage={props.setPage}
        theme={props.theme}
        userId={props.userId}
      />
      <Separator />
      <ClassMaterials selectedClasses={selectedClasses} />
    </Stack>
  );
};
