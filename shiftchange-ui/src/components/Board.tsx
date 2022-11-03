import React from "react";
import { BoardType, ColumnType } from "../types";
import { Stack, Text } from "@fluentui/react";
import { Column } from "./Column";
import { verticalStackTokens } from "../styles";

export type BoardProps = {
  board: BoardType;
};

export const Board: React.FC<BoardProps> = (props) => {
  const [columns, setColumns] = React.useState<ColumnType[]>();

  React.useEffect(() => {
    const fetchColumns = async () => {
      const response: Response = await fetch(`/board?id=${props.board.id}`);
      if (!response.ok) {
        console.log(
          `Error fetching /column?id=${props.board.id} - ${response.status}:${response.statusText}`
        );
        return;
      }
      const data: ColumnType[] = Array.from(await response.json());
      setColumns(data);
    };

    fetchColumns();
  }, [props.board.id]);

  if (!columns) return null;
  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">{props.board.title}</Text>

      <Stack horizontal horizontalAlign="space-between">
        {columns.map((column: ColumnType) => {
          console.log(`column: ${column.id}`);
          return <Column column={column} key={column.id} />;
        })}
      </Stack>
    </Stack>
  );
};
