import { ChoiceGroup } from "@fluentui/react";
import React from "react";
import { ApiClass, ApiEnrollment, CLASS_URL } from "../../api";

type ManagementRadioButtonsProps = {
  enrollments: ApiEnrollment[];
  selection?: ApiClass;
  setSelected: (selection?: ApiClass) => void;
};

export const ManagementRadioButtons: React.FC<ManagementRadioButtonsProps> = (
  props
) => {
  const [courses, setCourses] = React.useState<ApiClass[]>([]);

  React.useEffect(() => {
    const fetchClasses = async () => {
      const newCourses = await Promise.all(
        props.enrollments.map(async (value, idx): Promise<ApiClass> => {
          const response = await fetch(CLASS_URL(value.class_id));
          if (response.ok) {
            const data: ApiClass = await response.json();
            return data;
          } else {
            throw Error(`Error fetching class ${value.class_id}`);
          }
        })
      );
      setCourses(newCourses);
    };

    fetchClasses();
  }, [props.enrollments, props.setSelected]);

  return (
    <ChoiceGroup
      onChange={(event, option) => {
        console.log(option);
        if (option) {
          props.setSelected(
            courses.find((value) => {
              return value.id === option.key;
            })
          );
        }
      }}
      options={courses.map((value) => {
        return {
          key: value.id,
          text: value.code,
        };
      })}
      selectedKey={props.selection?.id}
    />
  );
};
