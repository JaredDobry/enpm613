import React from "react";

import {
  ActionButton,
  Callout,
  IconButton,
  Stack,
  Theme,
} from "@fluentui/react";

import { Settings, SettingsProps } from "./Settings";

interface MenuBarProps extends SettingsProps {
  setPage: (page: "home" | "assignment") => void;
  signOut: () => void;
  theme: Theme;
}

export const MenuBar: React.FC<MenuBarProps> = (props) => {
  const [showSettings, setShowSettings] = React.useState<boolean>(false);

  return (
    <>
      <Stack
        horizontal
        horizontalAlign="space-between"
        styles={{
          root: {
            borderBottomColor: props.theme.palette.neutralLight,
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
          },
        }}
        verticalAlign="center"
      >
        <ActionButton
          iconProps={{ iconName: "Home" }}
          onClick={() => props.setPage("home")}
          text="ShiftChange"
        />
        <Stack horizontal>
          <IconButton
            iconProps={{ iconName: "SignOut" }}
            onClick={props.signOut}
          />
          <IconButton
            iconProps={{ iconName: "Settings" }}
            id={"settingsButton"}
            onClick={() => setShowSettings(true)}
          />
        </Stack>
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
