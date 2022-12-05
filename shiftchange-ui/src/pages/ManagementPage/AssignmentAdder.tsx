import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import React from "react";
import {
  AddRemove,
  ApiAssignment,
  ApiAssignmentPost,
  ApiClass,
  ASSIGNMENT_MANAGEMENT_URL,
} from "../../api";
import { verticalStackTokens } from "../../styles";

type AssignmentAdderProps = {
  addAssignment: (a: ApiAssignment) => void;
  course: ApiClass;
  setError: (s: string) => void;
  setShow: (s: boolean) => void;
  show: boolean;
  token: string;
};

export const AssignmentAdder: React.FC<AssignmentAdderProps> = (props) => {
  const [description, setDescription] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [file, setFile] = React.useState<File>();

  if (!props.show) return null;
  return (
    <Dialog
      dialogContentProps={{ title: "Upload new assignment" }}
      hidden={false}
    >
      <Stack tokens={verticalStackTokens}>
        <TextField
          label="Name"
          onChange={(event, newValue) => {
            setName(newValue ? newValue : "");
          }}
          onGetErrorMessage={(value) => {
            if (value === "") return "Assignment name required";
            else return "";
          }}
          required
          value={name}
        />
        <TextField
          label="Description"
          multiline
          onChange={(event, newValue) => {
            setDescription(newValue ? newValue : "");
          }}
          value={description}
        />
        <input
          aria-label="Select a file"
          onChange={(event) => {
            if (event.target.files && event.target.files.length >= 1)
              setFile(event.target.files[0]);
          }}
          type="file"
        />
      </Stack>
      <DialogFooter>
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <DefaultButton onClick={() => props.setShow(false)} text="Cancel" />
          <PrimaryButton
            onClick={async () => {
              if (file) {
                const upload: ApiAssignmentPost = {
                  action_type: AddRemove.add,
                  blob: await file.text(),
                  class_id: props.course.id,
                  description: description,
                  name: name,
                  token: props.token,
                };

                const response = await fetch(ASSIGNMENT_MANAGEMENT_URL, {
                  body: JSON.stringify(upload),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (response.ok) {
                  const new_id: string = await response.json();
                  const a: ApiAssignment = {
                    class_id: props.course.id,
                    description: description,
                    id: new_id,
                    link: "",
                    name: name,
                  };
                  props.addAssignment(a);
                  props.setShow(false);
                } else {
                  props.setError(`Error uploading file ${file.name}`);
                  props.setShow(false);
                }
              }
            }}
            text="Upload"
          />
        </Stack>
      </DialogFooter>
    </Dialog>
  );
};
