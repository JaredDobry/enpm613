import { Stack, Text, Theme } from "@fluentui/react";
import React from "react";

type FilePreviewProps = {
  link: string;
  theme: Theme;
};

export const FilePreview: React.FC<FilePreviewProps> = (props) => {
  return (
    <div
      style={{
        border: `thin solid ${props.theme.palette.themeLighterAlt}`,
        height: 400,
      }}
    >
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill>
        <Text>Could not preview file</Text>
      </Stack>
    </div>
  );
};
