import { PrimaryButton, Stack, Text, TextField } from "@fluentui/react";
import React from "react";
import { ApiAssignment, ApiComment, ASSIGNMENT_COMMENTS_URL } from "../api";
import { horizontalStackTokens, verticalStackTokens } from "../styles";

type CommentsProps = {
  assignment: ApiAssignment;
  userId: string;
};

export const Comments: React.FC<CommentsProps> = (props) => {
  const [comments, setComments] = React.useState<ApiComment[]>([]);
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        ASSIGNMENT_COMMENTS_URL(props.assignment.id, props.userId)
      );
      if (!response.ok) {
        console.log(
          `Error fetching comments for assignment ${props.assignment.id} and student ${props.userId}`
        );
        return;
      }
      setComments(await response.json());
    };

    fetchComments();
  }, [props.assignment]);

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLargePlus">Comments</Text>
      <Stack tokens={horizontalStackTokens}>
        <TextField
          onChange={(event, newValue) => setComment(newValue ? newValue : "")}
          multiline
          placeholder="Make a comment"
          value={comment}
        />
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton text="Comment" />
        </Stack>
      </Stack>
    </Stack>
  );
};
