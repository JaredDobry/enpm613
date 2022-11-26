import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";
import React from "react";
import { LOGIN_URL } from "../api";
import { sha256 } from "sha.js";

type LoginPageProps = {
  setToken: (token: string) => void;
};

export const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [loginFailed, setLoginFailed] = React.useState<boolean>();
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");

  return (
    <Stack horizontalAlign="center" verticalAlign="center">
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
            onClick={async () => {
              const encrypted = new sha256()
                .update(username + password)
                .digest("hex");
              const response = await fetch(LOGIN_URL, {
                body: JSON.stringify(encrypted),
                headers: { "Content-Type": "application/json" },
                method: "POST",
              });
              if (response.ok) {
                const token = await response.json();
                props.setToken(token);
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
