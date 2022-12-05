import { IconButton, Stack } from "@fluentui/react";
import React from "react";
import { horizontalStackTokens, verticalStackTokens } from "../styles";

type ExpandablePaneProps = {
  paneElement: JSX.Element;
};

export const ExpandablePane: React.FC<ExpandablePaneProps> = (props) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  return (
    <Stack tokens={verticalStackTokens}>
      <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
        <IconButton
          iconProps={{ iconName: expanded ? "ChevronUp" : "ChevronDown" }}
          onClick={() => setExpanded(!expanded)}
        />
        <Stack.Item grow>{props.paneElement}</Stack.Item>
      </Stack>
      {expanded && <div style={{ marginLeft: 20 }}>{props.children}</div>}
    </Stack>
  );
};
