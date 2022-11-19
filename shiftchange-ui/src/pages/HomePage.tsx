import React from "react";
import { ClassesDropdown } from "../components/ClassesDropdown";

type HomePageProps = {
  userId: string;
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  const [classes, setClasses] = React.useState<string | string[]>("all");

  return (
    <ClassesDropdown
      userId={props.userId}
      setClasses={(classes: string | string[]) => setClasses(classes)}
    />
  );
};
