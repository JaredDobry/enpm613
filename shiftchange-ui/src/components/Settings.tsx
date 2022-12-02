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
          ariaLabel="Switch to light mode"
          iconProps={{ iconName: "Sunny" }}
          onClick={() => props.setDarkMode(false)}
          text="Switch to light mode"
        />
      ) : (
        <ActionButton
          ariaLabel="Switch to dark mode"
          iconProps={{ iconName: "ClearNight" }}
          onClick={() => props.setDarkMode(true)}
          text="Switch to dark mode"
        />
      )}
    </Stack>
  );
};
