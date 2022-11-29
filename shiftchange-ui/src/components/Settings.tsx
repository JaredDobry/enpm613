import React from "react";

import { ActionButton, Stack } from "@fluentui/react";

export type SettingsProps = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export const Settings: React.FC<SettingsProps> = (props) => {
  return (
    <Stack>
      {props.darkMode ? (
        <ActionButton
          iconProps={{ iconName: "Sunny" }}
          onClick={() => props.setDarkMode(false)}
          text="Switch to light mode"
        />
      ) : (
        <ActionButton
          iconProps={{ iconName: "ClearNight" }}
          onClick={() => props.setDarkMode(true)}
          text="Switch to dark mode"
        />
      )}
    </Stack>
  );
};
