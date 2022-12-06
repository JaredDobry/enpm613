import {
  Stack,
  Text,
  TextField,
  DefaultButton,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Link,
} from "@fluentui/react";
import React from "react";
import { sha256 } from "sha.js";
import { LOGIN_URL, ApiRegisterPost } from "../api";

type RegisterPageProps = {
  setPage: (page: string) => void;
};

export const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const [registerStatus, setRegisterStatus] = React.useState<
    "fail" | "success" | "inputs" | undefined
  >();
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
      <Text variant="xxLargePlus">Registration</Text>
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
            onClick={() => props.setPage("login")}
            styles={{ root: { marginBottom: 20, marginTop: 20 } }}
            text="Login"
          />
          <PrimaryButton
            ariaLabel="Register"
            onClick={async () => {
              if (username.length > 0 && password.length > 0) {
                const encrypted = new sha256().update(password).digest("hex");
                const post: ApiRegisterPost = {
                  username: username,
                  password: encrypted,
                };
                const response = await fetch(LOGIN_URL, {
                  body: JSON.stringify(post),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (response.ok) setRegisterStatus("success");
                else setRegisterStatus("fail");
              } else setRegisterStatus("inputs");
            }}
            styles={{ root: { marginBottom: 20, marginTop: 20 } }}
            text="Register"
          />
        </Stack>
      </Stack>
      {registerStatus === "inputs" && (
        <MessageBar
          messageBarType={MessageBarType.severeWarning}
          onDismiss={() => setRegisterStatus(undefined)}
          styles={{
            root: { maxWidth: 300 },
          }}
        >
          Username and password cannot be empty.
        </MessageBar>
      )}
      {registerStatus === "fail" && (
        <MessageBar
          messageBarType={MessageBarType.severeWarning}
          onDismiss={() => setRegisterStatus(undefined)}
          styles={{
            root: { maxWidth: 300 },
          }}
        >
          Failed to register, try again.
        </MessageBar>
      )}
      {registerStatus === "success" && (
        <MessageBar
          messageBarType={MessageBarType.success}
          onDismiss={() => setRegisterStatus(undefined)}
          styles={{
            root: { maxWidth: 300 },
          }}
        >
          Successfully registered. Go{" "}
          <Link onClick={() => props.setPage("login")}>login</Link>
        </MessageBar>
      )}
    </Stack>
  );
};
