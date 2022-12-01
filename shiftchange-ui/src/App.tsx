import React from "react";

import { createTheme, Stack, ThemeProvider } from "@fluentui/react";

import { MenuBar } from "./components/MenuBar";
import { AssignmentPage } from "./pages/AssignmentPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { darkPalette, lightPalette, verticalStackTokens } from "./styles";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<string>("login");
  const [pageData, setPageData] = React.useState<any>();
  const [token, setToken] = React.useState<string>();

  const theme = createTheme({ palette: darkMode ? darkPalette : lightPalette });

  return (
    <ThemeProvider applyTo="body" theme={theme}>
      <Stack tokens={verticalStackTokens}>
        {page !== "login" && (
          <MenuBar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setPage={(page: "home" | "assignment") => {
              setPage(page);
              setPageData(undefined);
            }}
            signOut={() => {
              setToken(undefined);
              setPage("login");
            }}
            theme={theme}
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
        {page === "home" && token && (
          <HomePage
            setPage={(page: "home" | "assignment", data?: any) => {
              setPage(page);
              setPageData(data);
            }}
            theme={theme}
            token={token}
            userId="1"
          />
        )}
        {page === "assignment" && token && (
          <AssignmentPage
            assignment={pageData.assignment}
            course={pageData.course}
            theme={theme}
            token={token}
            userId="1"
          />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default App;
