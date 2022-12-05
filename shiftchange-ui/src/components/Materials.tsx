import React from "react";

import { Link, Stack, Text } from "@fluentui/react";

import { ApiClass, ApiCourseMaterial, CLASS_MATERIALS_URL } from "../api";
import { verticalStackTokens } from "../styles";

type MaterialsProps = {
  course: ApiClass;
};

export const Materials: React.FC<MaterialsProps> = (props) => {
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
    <Stack tokens={verticalStackTokens}>
      <Text variant="xLarge">
        {props.course.code}: {props.course.name}
      </Text>
      {materials.map((value) => {
        return (
          <Stack horizontal>
            <Link
              href={value.link}
              key={`material-${value.id}`}
              onClick={() => window.open(value.link)}
            >
              <Text variant="large">{value.name}</Text>
            </Link>
          </Stack>
        );
      })}
      {materials.length === 0 && (
        <Text variant="large">This course has no available materials</Text>
      )}
    </Stack>
  );
};
