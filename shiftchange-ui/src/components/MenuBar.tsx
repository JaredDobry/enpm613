import React from "react";

import {
  ActionButton,
  Callout,
  IconButton,
  Stack,
  Theme,
} from "@fluentui/react";

import { ApiLoginTypes } from "../api";
import { Settings, SettingsProps } from "./Settings";

interface MenuBarProps extends SettingsProps {
  accountType: ApiLoginTypes;
  setPage: (page: string) => void;
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
        <Stack horizontal>
          <ActionButton
            ariaLabel="Go to home page"
            iconProps={{ iconName: "Home" }}
            onClick={() => props.setPage("home")}
            text="ShiftChange"
          />
          <ActionButton
            ariaLabel="Enroll in more classes"
            iconProps={{ iconName: "AddEvent" }}
            onClick={() => props.setPage("enroll")}
            text="Enroll"
          />
          {props.accountType === ApiLoginTypes.professor && (
            <ActionButton
              ariaLabel="Class management"
              iconProps={{ iconName: "Script" }}
              onClick={() => props.setPage("management")}
              text="Class Management"
            />
          )}
        </Stack>
        <Stack horizontal>
          <IconButton
            ariaLabel="Sign out"
            iconProps={{ iconName: "SignOut" }}
            onClick={props.signOut}
          />
          <IconButton
            ariaLabel="Open settings menu"
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
