import { Checkbox, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiClass } from "../api";
import { verticalStackTokens } from "../styles";

type ClassSelectorProps = {
  classes?: ApiClass[];
  selectedClasses: ApiClass[];
  setSelectedClasses: React.Dispatch<React.SetStateAction<ApiClass[]>>;
};

export const ClassSelector: React.FC<ClassSelectorProps> = (props) => {
  if (!props.classes) {
    return null;
  }
  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">Class Selection</Text>
      {props.classes.map((value) => {
        const isChecked = props.selectedClasses.includes(value);
        return (
          <Checkbox
            ariaLabel={`${isChecked ? "Deselect" : "Select"} course ${
              value.code
            }`}
            checked={isChecked}
            key={`checkbox-${value.id}`}
            label={value.code}
            onChange={(event, checked) => {
              if (checked) props.setSelectedClasses((old) => [...old, value]);
              else
                props.setSelectedClasses((old) => [
                  ...old.filter((v) => {
                    return v.id !== value.id;
                  }),
                ]);
            }}
          />
        );
      })}
    </Stack>
  );
};
