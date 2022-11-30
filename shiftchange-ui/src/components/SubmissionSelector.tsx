import { PrimaryButton, Stack } from "@fluentui/react";
import React from "react";

export const SubmissionSelector: React.FC = (props) => {
  const [file, setFile] = React.useState<File>();

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
      <input
        onChange={(event) => {
          if (event.target.files && event.target.files.length >= 1)
            setFile(event.target.files[0]);
        }}
        type="file"
      />
      <PrimaryButton
        onClick={async () => {
          console.log(file?.name);
          console.log(file);
        }}
        text="Submit"
      />
    </Stack>
  );
};
