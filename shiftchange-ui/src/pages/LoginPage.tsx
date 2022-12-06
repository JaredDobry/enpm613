import React from "react";
import { sha256 } from "sha.js";

import {
  DefaultButton,
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
  setPage: (page: string) => void;
  setToken: (token: string) => void;
  setUserId: (userId: string) => void;
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
          required
          styles={{ root: { width: 300 } }}
          value={username}
        />
        <TextField
          ariaLabel="Login password"
          canRevealPassword
          label="Password"
          onChange={(event, newValue) => setPassword(newValue ? newValue : "")}
          required
          styles={{ root: { width: 300 } }}
          type="password"
          value={password}
        />
        <Stack horizontal horizontalAlign="space-between">
          <DefaultButton
            onClick={() => props.setPage("register")}
            styles={{ root: { marginBottom: 20, marginTop: 20 } }}
            text="Sign Up"
          />
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
                props.setUserId(login.user_id);
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
