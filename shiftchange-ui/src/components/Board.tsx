import React from "react";
import { BoardType, TicketColumnType } from "../types";
import { Stack, Text } from "@fluentui/react";
import { TicketColumn } from "./TicketColumn";
import { verticalStackTokens } from "../styles";

export type BoardProps = {
  board: BoardType;
};

export const Board: React.FC<BoardProps> = (props) => {
  const [columns, setColumns] = React.useState<TicketColumnType[]>();

  React.useEffect(() => {
    const fetchColumns = async () => {
      const response: Response = await fetch(`/board?id=${props.board.id}`);
      if (!response.ok) {
        console.log(
          `Error fetching /column?id=${props.board.id} - ${response.status}:${response.statusText}`
        );
        return;
      }
      const data: TicketColumnType[] = Array.from(await response.json());
      setColumns(data);
    };

    fetchColumns();
  }, [props.board.id]);

  if (!columns) return null;
  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">{props.board.title}</Text>

      <Stack horizontal horizontalAlign="space-between">
        {columns.map((column: TicketColumnType) => {
          console.log(`column: ${column.id}`);
          return <TicketColumn column={column} key={column.id} />;
        })}
      </Stack>
    </Stack>
  );
};
