import { Stack, Text, Link } from "@fluentui/react";
import React from "react";
import {
  ApiClass,
  ApiCourseMaterial,
  CLASS_URL,
  CLASS_MATERIALS_URL,
} from "../api";
import { verticalStackTokens } from "../styles";

type CourseMaterialsProps = {
  course: string;
  userId: string;
};

export const CourseMaterials: React.FC<CourseMaterialsProps> = (props) => {
  const [course, setCourse] = React.useState<ApiClass>();
  const [materials, setMaterials] = React.useState<ApiCourseMaterial[]>([]);

  React.useEffect(() => {
    const fetchClassMaterials = async () => {
      const response = await fetch(CLASS_URL(props.course));
      if (response.ok) {
        const data: ApiClass = await response.json();
        setCourse(data);
        const mResponse = await fetch(CLASS_MATERIALS_URL(data.id));
        if (mResponse.ok) {
          const mData: ApiCourseMaterial[] = await mResponse.json();
          setMaterials(mData);
        } else {
          console.log(`Error fetching materials for class ${props.course}`);
        }
      } else {
        console.log(`Error fetching class ${props.course}`);
      }
    };

    fetchClassMaterials();
  }, [props.course, props.userId]);

  if (!course) return null;
  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLarge">
        {course.code}: {course.name}
      </Text>
      {materials.map((value) => {
        return (
          <Link href={value.link}>
            <Text variant="large">{value.name}</Text>
          </Link>
        );
      })}
      {materials.length === 0 && (
        <Text variant="large">This course has no available materials</Text>
      )}
    </Stack>
  );
};
