import {
  ActionButton,
  DefaultButton,
  Dialog,
  DialogFooter,
  MessageBar,
  PrimaryButton,
  MessageBarType,
  Stack,
  Text,
} from "@fluentui/react";
import React from "react";
import {
  AddRemove,
  ApiClass,
  ApiCourseMaterial,
  CLASS_MATERIALS_URL,
  MATERIAL_URL,
} from "../../api";
import { horizontalStackTokens, verticalStackTokens } from "../../styles";
import { MaterialAdder } from "./MaterialAdder";
import { MaterialRemover } from "./MaterialRemover";

type MaterialsManagerProps = {
  course: ApiClass;
  token: string;
};

export const MaterialsManager: React.FC<MaterialsManagerProps> = (props) => {
  const [materials, setMaterials] = React.useState<ApiCourseMaterial[]>([]);
  const [choppingBlock, setChoppingBlock] = React.useState<ApiCourseMaterial>();
  const [error, setError] = React.useState<string>();
  const [showAdd, setShowAdd] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchClassMaterials = async () => {
      const response = await fetch(CLASS_MATERIALS_URL(props.course.id));
      if (!response.ok) {
        console.log(`Error fetching materials for class ${props.course.id}`);
        setMaterials([]);
        return;
      }
      setMaterials(await response.json());
    };

    fetchClassMaterials();
  }, [props.course]);

  return (
    <>
      <Stack tokens={verticalStackTokens}>
        <Stack horizontal tokens={horizontalStackTokens} verticalAlign="center">
          <Text variant="xxLarge">Materials</Text>
          <ActionButton
            iconProps={{ iconName: "Add" }}
            onClick={() => setShowAdd(true)}
            text="Upload Materials"
          />
        </Stack>
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => setError(undefined)}
          >
            {error}
          </MessageBar>
        )}
        {materials.map((m) => {
          return (
            <MaterialRemover
              key={`material-${m.id}`}
              material={m}
              token={props.token}
              setChoppingBlock={setChoppingBlock}
            />
          );
        })}
      </Stack>
      <Dialog
        dialogContentProps={{
          title: "Warning",
          subText: `Are you sure you want to delete "${choppingBlock?.name}"? This action is destructive and irreversible.`,
        }}
        hidden={!choppingBlock}
        onDismiss={() => setChoppingBlock(undefined)}
      >
        <DialogFooter>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton
              onClick={() => setChoppingBlock(undefined)}
              text="Cancel"
            />
            <PrimaryButton
              onClick={async () => {
                const response = await fetch(MATERIAL_URL, {
                  body: JSON.stringify({
                    action_type: AddRemove.remove,
                    id: choppingBlock?.id,
                  }),
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                });
                if (response.ok) {
                  setMaterials(
                    materials.filter((value) => {
                      return value.id !== choppingBlock?.id;
                    })
                  );
                  setChoppingBlock(undefined);
                } else {
                  setError(`Error deleting material ${choppingBlock?.name}`);
                  setChoppingBlock(undefined);
                }
              }}
              text="Delete"
            />
          </Stack>
        </DialogFooter>
      </Dialog>
      <MaterialAdder
        addMaterial={(s) => setMaterials((old) => [...old, s])}
        course={props.course}
        setError={setError}
        setShow={setShowAdd}
        show={showAdd}
        token={props.token}
      />
    </>
  );
};
