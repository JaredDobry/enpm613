import { Dropdown, IDropdownOption } from "@fluentui/react";
import React from "react";

type ClassesDropdownProps = {
  token: string;
  setClass: (classID: string) => void;
};

export const ClassesDropdown: React.FC<ClassesDropdownProps> = (props) => {
  const [classes, setClasses] = React.useState<IDropdownOption[]>();

  React.useEffect(() => {
    const getClasses = async () => {
      const response = fetch("");
    };

    getClasses();
  }, []);

  if (!classes) return <></>;

  return <Dropdown options={classes} />;
};
