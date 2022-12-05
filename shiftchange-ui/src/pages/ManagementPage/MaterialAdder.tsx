import React from "react";

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";

import {
  AddRemove,
  ApiClass,
  ApiCourseMaterial,
  ApiMaterialPost,
  MATERIAL_URL,
} from "../../api";
import { verticalStackTokens } from "../../styles";

type MaterialAdderProps = {
  addMaterial: (m: ApiCourseMaterial) => void;
  course: ApiClass;
  setError: (s: string) => void;
  setShow: (s: boolean) => void;
  show: boolean;
  token: string;
};

export const MaterialAdder: React.FC<MaterialAdderProps> = (props) => {
  const [name, setName] = React.useState<string>("");
  const [file, setFile] = React.useState<File>();

  if (!props.show) return null;
  return (
    <Dialog
      dialogContentProps={{ title: "Upload new course materials" }}
      hidden={false}
    >
      <Stack tokens={verticalStackTokens}>
        <TextField
          label="Name"
          onChange={(event, newValue) => {
            setName(newValue ? newValue : "");
          }}
          onGetErrorMessage={(value) => {
            if (value === "") return "Material name required";
            else return "";
          }}
          required
          value={name}
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
                const upload: ApiMaterialPost = {
                  action_type: AddRemove.add,
                  blob: await file.text(),
                  class_id: props.course.id,
                  name: name,
                  token: props.token,
                };

                const response = await fetch(MATERIAL_URL, {
                  body: JSON.stringify(upload),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (response.ok) {
                  const new_id: string = await response.json();
                  const m: ApiCourseMaterial = {
                    class_id: props.course.id,
                    id: new_id,
                    link: "",
                    name: name,
                  };
                  props.addMaterial(m);
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
