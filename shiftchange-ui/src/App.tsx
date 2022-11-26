import { createTheme, Stack, ThemeProvider } from "@fluentui/react";
import React from "react";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./pages/HomePage";
import { darkPalette, lightPalette } from "./styles";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<string>("login");
  return (
    <ThemeProvider
      applyTo="body"
      theme={createTheme({ palette: darkMode ? darkPalette : lightPalette })}
    >
      <Stack>
        <MenuBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setPage={(page: "home" | "assignment") => {
            setPage(page);
          }}
        />
        {page === "home" && <HomePage darkMode={darkMode} userId="1" />}
      </Stack>
    </ThemeProvider>
  );
};

export default App;
