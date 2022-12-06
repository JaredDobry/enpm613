import React from "react";

import { createTheme, Stack, ThemeProvider } from "@fluentui/react";

import { ApiLoginTypes } from "./api";
import { MenuBar } from "./components/MenuBar";
import { AssignmentPage } from "./pages/AssignmentPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ManagementPage } from "./pages/ManagementPage/ManagementPage";
import { darkPalette, lightPalette, verticalStackTokens } from "./styles";
import { RegisterPage } from "./pages/RegisterPage";
import { EnrollPage } from "./pages/EnrollPage/EnrollPage";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [loginType, setLoginType] = React.useState<ApiLoginTypes>();
  const [page, setPage] = React.useState<string>("login");
  const [pageData, setPageData] = React.useState<any>();
  const [token, setToken] = React.useState<string>();

  const theme = createTheme({ palette: darkMode ? darkPalette : lightPalette });

  return (
    <ThemeProvider applyTo="body" theme={theme}>
      <Stack tokens={verticalStackTokens}>
        {page !== "login" && page !== "register" && loginType && (
          <MenuBar
            accountType={loginType}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setPage={(page: string) => {
              setPage(page);
              setPageData(undefined);
            }}
            signOut={() => {
              setLoginType(undefined);
              setToken(undefined);
              setPage("login");
            }}
            theme={theme}
          />
        )}
        {page === "login" && (
          <LoginPage
            setLoginType={setLoginType}
            setPage={setPage}
            setToken={(token: string) => {
              setToken(token);
              setPage("home");
            }}
          />
        )}
        {page === "register" && <RegisterPage setPage={setPage} />}
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
        {page === "enroll" && token && (
          <EnrollPage token={token} userId={"1"} />
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
        {page === "management" && token && (
          <ManagementPage token={token} userId="4" />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default App;
