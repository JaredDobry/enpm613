import { createTheme, Stack, ThemeProvider } from "@fluentui/react";
import React from "react";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { darkPalette, lightPalette } from "./styles";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<string>("login");
  const [token, setToken] = React.useState<string>();

  return (
    <ThemeProvider
      applyTo="body"
      theme={createTheme({ palette: darkMode ? darkPalette : lightPalette })}
    >
      <Stack>
        {page !== "login" && (
          <MenuBar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setPage={(page: "home" | "assignment") => {
              setPage(page);
            }}
            signOut={() => {
              setToken(undefined);
              setPage("login");
            }}
          />
        )}
        {page === "login" && (
          <LoginPage
            setToken={(token: string) => {
              setToken(token);
              setPage("home");
            }}
          />
        )}
        {page === "home" && <HomePage darkMode={darkMode} userId="1" />}
      </Stack>
    </ThemeProvider>
  );
};

export default App;
