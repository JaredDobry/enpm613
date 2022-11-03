import { Stack, mergeStyleSets, Text } from "@fluentui/react";
import React from "react";
import {
  columnStyles,
  verticalStackTokens,
  paddingStyles,
  appPalette,
} from "../styles";
import { ColumnType, AssignmentType } from "../types";
import { Assignment } from "./Assignment";

export type ColumnProps = {
  column: ColumnType;
};

export const Column: React.FC<ColumnProps> = (props) => {
  const [assignments, setAssignments] = React.useState<AssignmentType[]>();

  React.useEffect(() => {
    const fetchAssignments = async () => {
      const response: Response = await fetch(`/column?id=${props.column.id}`);
      if (!response.ok) {
        console.log(
          `Error fetching /column?id=${props.column.id} - ${response.status}:${response.statusText}`
        );
        return;
      }
      const data: AssignmentType[] = Array.from(await response.json());
      setAssignments(data);
    };

    fetchAssignments();
  }, [props.column.id]);

  if (!assignments) return null;
  return (
    <Stack
      styles={mergeStyleSets(paddingStyles, columnStyles, {
        root: { background: appPalette.neutralLight },
      })}
      tokens={verticalStackTokens}
    >
      <Text variant="xLarge">{props.column.title}</Text>
      {assignments.map((assignment: AssignmentType) => {
        return <Assignment key={assignment.id} assignment={assignment} />;
      })}
    </Stack>
  );
};
