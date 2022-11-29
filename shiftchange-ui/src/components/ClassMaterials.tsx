import React from "react";

import { Stack, Text } from "@fluentui/react";

import { ApiClass } from "../api";
import { verticalStackTokens } from "../styles";
import { Materials } from "./Materials";

type ClassMaterialsProps = {
  selectedClasses: ApiClass[];
};

export const ClassMaterials: React.FC<ClassMaterialsProps> = (props) => {
  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">Class Materials</Text>
      {props.selectedClasses.map((value) => {
        return <Materials course={value} key={`materials-${value.id}`} />;
      })}
    </Stack>
  );
};
