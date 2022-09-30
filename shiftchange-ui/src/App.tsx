import React from "react";
import { Board } from "./components/Board";
import { TicketColumn } from "./components/TicketColumn";
import { mockBoards } from "./mocks/mockResponses";

const App: React.FC = () => {
  return <Board board={mockBoards[0]} />;
};

export default App;
