import { Stack, Text } from "@fluentui/react";
import React from "react";
import { ApiClass, ApiCourseMaterial, CLASS_MATERIALS_URL } from "../../api";

type MaterialsMangerProps = {
  course: ApiClass;
  token: string;
};

export const MaterialsManger: React.FC<MaterialsMangerProps> = (props) => {
  const [materials, setMaterials] = React.useState<ApiCourseMaterial[]>([]);

  React.useEffect(() => {
    const fetchClassMaterials = async () => {
      const response = await fetch(CLASS_MATERIALS_URL(props.course.id));
      if (!response.ok) {
        console.log(`Error fetching materials for class ${props.course.id}`);
        return;
      }
      setMaterials(await response.json());
    };

    fetchClassMaterials();
  }, [props.course]);

  return (
    <Stack>
      <Text>Materials</Text>
    </Stack>
  );
};
