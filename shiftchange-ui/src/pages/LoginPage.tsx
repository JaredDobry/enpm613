import React from "react";
import { sha256 } from "sha.js";

import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";

import {
  ApiLoginPost,
  ApiLoginResponse,
  ApiLoginTypes,
  LOGIN_URL,
} from "../api";

type LoginPageProps = {
  setLoginType: (lt: ApiLoginTypes) => void;
  setToken: (token: string) => void;
};

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [loginFailed, setLoginFailed] = React.useState<boolean>();
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");

  return (
    <Stack
      horizontalAlign="center"
      styles={{
        root: {
          height: "100vh",
        },
      }}
      verticalAlign="center"
    >
      <Text variant="xxLargePlus">ShiftChange</Text>
      <Stack>
        <TextField
          ariaLabel="Login username"
          label="Username"
          onChange={(event, newValue) => setUsername(newValue ? newValue : "")}
          styles={{ root: { width: 300 } }}
          value={username}
        />
        <TextField
          ariaLabel="Login password"
          canRevealPassword
          label="Password"
          onChange={(event, newValue) => setPassword(newValue ? newValue : "")}
          styles={{ root: { width: 300 } }}
          type="password"
          value={password}
        />
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton
            ariaLabel="Login"
            onClick={async () => {
              const encrypted = new sha256().update(password).digest("hex");
              const post: ApiLoginPost = {
                username: username,
                password: encrypted,
              };
              const response = await fetch(LOGIN_URL, {
                body: JSON.stringify(post),
                headers: { "Content-Type": "application/json" },
                method: "POST",
              });
              if (response.ok) {
                const login: ApiLoginResponse = await response.json();
                props.setLoginType(login.account_type);
                props.setToken(login.token);
              } else {
                setLoginFailed(true);
              }
            }}
            styles={{ root: { marginBottom: 20, marginTop: 20 } }}
            text="Login"
          />
        </Stack>
      </Stack>

      {loginFailed && (
        <MessageBar
          messageBarType={MessageBarType.severeWarning}
          onDismiss={() => setLoginFailed(undefined)}
          styles={{
            root: { maxWidth: 300 },
          }}
        >
          Nonexistent user or incorrect password
        </MessageBar>
      )}
    </Stack>
  );
};
