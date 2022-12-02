import React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

import { IconButton, Stack, Text, Theme } from "@fluentui/react";

import { horizontalStackTokens, verticalStackTokens } from "../styles";

type FilePreviewProps = {
  link: string;
  theme: Theme;
};

export const FilePreview: React.FC<FilePreviewProps> = (props) => {
  const [numPages, setNumPages] = React.useState<number>(1);
  const [page, setPage] = React.useState<number>(1);

  return (
    <>
      {props.link.includes(".pdf") && (
        <Stack
          horizontalAlign="center"
          tokens={verticalStackTokens}
          verticalAlign="center"
          verticalFill
        >
          <Document
            file={props.link}
            onLoadSuccess={(pdf) => {
              setNumPages(pdf.numPages);
            }}
          >
            <Page
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
          <Stack
            horizontal
            tokens={horizontalStackTokens}
            verticalAlign="center"
          >
            <IconButton
              ariaLabel={`Change preview to page ${page - 1}`}
              disabled={page === 1}
              iconProps={{ iconName: "ChevronLeft" }}
              onClick={() => {
                setPage((old) => old - 1);
              }}
            />
            <Text>
              Page {page} of {numPages}
            </Text>
            <IconButton
              ariaLabel={`Change preview to page ${page + 1}`}
              disabled={page === numPages}
              iconProps={{ iconName: "ChevronRight" }}
              onClick={() => {
                setPage((old) => old + 1);
              }}
            />
          </Stack>
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
