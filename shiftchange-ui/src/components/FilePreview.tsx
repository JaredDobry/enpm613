import { Stack, Text, Theme } from "@fluentui/react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import React from "react";

type FilePreviewProps = {
  link: string;
  theme: Theme;
};

export const FilePreview: React.FC<FilePreviewProps> = (props) => {
  const [numPages, setNumPages] = React.useState<number>();
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  console.log(props.link.includes(".pdf"));

  return (
    <>
      {props.link.includes(".pdf") && (
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill>
          <Document file={props.link}>
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </Stack>
      )}
      {!props.link.includes(".pdf") && (
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
      )}
    </>
  );
};
