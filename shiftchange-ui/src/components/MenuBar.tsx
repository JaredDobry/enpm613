import { Callout, IconButton, Stack } from "@fluentui/react";
import React from "react";
import { Settings, SettingsProps } from "./Settings";

interface MenuBarProps extends SettingsProps {
  setPage: (page: "home" | "assignment") => void;
}

export const MenuBar: React.FC<MenuBarProps> = (props) => {
  const [showSettings, setShowSettings] = React.useState<boolean>(false);

  return (
    <>
      <Stack horizontal horizontalAlign="space-between">
        <IconButton
          iconProps={{ iconName: "Home" }}
          onClick={() => props.setPage("home")}
        />
        <IconButton
          iconProps={{ iconName: "Settings" }}
          id={"settingsButton"}
          onClick={() => setShowSettings(true)}
        />
      </Stack>
      <Callout
        hidden={!showSettings}
        onDismiss={() => setShowSettings(false)}
        target={"#settingsButton"}
      >
        <Settings {...props} />
      </Callout>
    </>
  );
};
