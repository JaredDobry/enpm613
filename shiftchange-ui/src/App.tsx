import { Stack } from "@fluentui/react";
import React from "react";
import { Board } from "./components/Board";
import { mockBoards } from "./mocks/mockResponses";
import { marginStyles } from "./styles";

const App: React.FC = () => {
  return (
    <Stack styles={marginStyles}>
      <Board board={mockBoards[0]} />
    </Stack>
  );
};

export default App;
