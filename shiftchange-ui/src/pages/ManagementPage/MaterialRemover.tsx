import React from "react";

import { IconButton, Stack, Text } from "@fluentui/react";

import { ApiCourseMaterial } from "../../api";
import { horizontalStackTokens } from "../../styles";

type MaterialRemoverProps = {
  material: ApiCourseMaterial;
  token: string;
  setChoppingBlock: (m: ApiCourseMaterial) => void;
};

export const MaterialRemover: React.FC<MaterialRemoverProps> = (props) => {
  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      key={`material-${props.material.id}`}
      tokens={horizontalStackTokens}
      verticalAlign="center"
    >
      <Text>{props.material.name}</Text>
      <IconButton
        iconProps={{ iconName: "CalculatorSubtract" }}
        onClick={() => props.setChoppingBlock(props.material)}
      />
    </Stack>
  );
};
