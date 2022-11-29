import React from "react";

import { Dropdown, IDropdownOption, Stack, Text } from "@fluentui/react";

import { ApiClass, ApiEnrollment, CLASS_URL, ENROLLMENTS_URL } from "../api";
import { horizontalStackTokens } from "../styles";

type ClassesDropdownProps = {
  userId: string;
  setClasses: (classID: string[]) => void;
};

export const ClassesDropdown: React.FC<ClassesDropdownProps> = (props) => {
  const [classes, setClasses] = React.useState<IDropdownOption[]>();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getClasses = async () => {
      const response = await fetch(ENROLLMENTS_URL(props.userId));
      if (response.ok) {
        const data: ApiEnrollment[] = await response.json();
        const newClasses: IDropdownOption[] = [];
        data.forEach(async (value) => {
          const cResponse = await fetch(CLASS_URL(value.class_id));
          if (cResponse.ok) {
            const cData: ApiClass = await cResponse.json();
            newClasses.push({
              key: cData.id,
              text: cData.code,
            });
          } else console.log(`Error fetching class data for ${value.class_id}`);
        });
        setClasses(newClasses);
      } else {
        console.log(`Error fetching enrollments for ${props.userId}`);
      }
    };

    getClasses();
  }, [props.userId]);

  React.useEffect(() => {
    props.setClasses(selectedKeys);
  }, [props, selectedKeys]);

  if (!classes) return null;

  return (
    <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
      <Text>Classes</Text>
      <Dropdown
        options={classes}
        multiSelect
        selectedKeys={selectedKeys}
        onChange={(event, option) => {
          if (option) {
            if (option.selected) {
              setSelectedKeys([...selectedKeys, option.key as string]);
            } else {
              setSelectedKeys(
                selectedKeys.filter((value) => {
                  return value !== option.key;
                })
              );
            }
          }
        }}
        styles={{ root: { minWidth: 100 } }}
      />
    </Stack>
  );
};
