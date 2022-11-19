import { Dropdown, IDropdownOption, Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiClass, ApiEnrollment, CLASS_URL, ENROLLMENTS_URL } from "../api";
import { horizontalStackTokens } from "../styles";

type ClassesDropdownProps = {
  userId: string;
  setClasses: (classID: string | string[]) => void;
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
          }
        });
        setClasses(newClasses);
        setSelectedKeys(
          newClasses.map((value) => {
            return value.key as string;
          })
        );
      } else {
        console.log("Error");
      }
    };

    getClasses();
  }, [props.userId]);

  if (!classes) return <></>;

  return (
    <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
      <Text>Class(es)</Text>
      <Dropdown
        options={classes}
        multiSelect
        selectedKeys={selectedKeys}
        onChange={(event, option) => {
          if (option) {
            if (option.selected) {
              setSelectedKeys([...selectedKeys, option.key as string]);
              props.setClasses(selectedKeys);
            } else {
              setSelectedKeys(
                selectedKeys.filter((value) => {
                  return value !== option.key;
                })
              );
              props.setClasses(selectedKeys);
            }
          }
        }}
        styles={{ root: { minWidth: 100 } }}
      />
    </Stack>
  );
};
