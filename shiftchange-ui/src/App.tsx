import {
  Dropdown,
  IDropdownOption,
  Spinner,
  SpinnerSize,
  Stack,
  Text,
} from "@fluentui/react";
import React from "react";
import { Board } from "./components/Board";
import { horizontalStackTokens, marginStyles } from "./styles";
import { BoardType } from "./types";

const App: React.FC = () => {
  const [boards, setBoards] = React.useState<BoardType[]>();
  const [selectedKey, setSelectedKey] = React.useState<number>(0);

  // On launch only, go query the boards
  React.useEffect(() => {
    const fetchBoards = async () => {
      const response: Response = await fetch("/boards");
      if (!response.ok) {
        console.log("Error fetching /boards");
        return;
      }
      const data: BoardType[] = Array.from(await response.json());
      setBoards(data);
    };

    fetchBoards();
  }, []);

  if (!boards) return <Spinner size={SpinnerSize.large} />;
  else {
    const dropdownOptions: IDropdownOption[] = boards.map(
      (value: BoardType) => {
        return {
          key: value.id,
          text: value.title,
        };
      }
    );

    return (
      <Stack styles={marginStyles}>
        <Stack horizontal verticalAlign="center" tokens={horizontalStackTokens}>
          <Dropdown
            onChange={(event, option) => {
              if (option) setSelectedKey(Number(option.key));
            }}
            options={dropdownOptions}
            selectedKey={selectedKey}
          />
        </Stack>
        <Board board={boards[selectedKey]} />
      </Stack>
    );
  }
};

export default App;
