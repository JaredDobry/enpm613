import React from "react";

import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from "@fluentui/react";

import {
  ApiAssignment,
  ApiComment,
  ApiCommentPost,
  ApiUser,
  ASSIGNMENT_COMMENTS_URL,
  COMMENT_URL,
  USER_URL,
} from "../api";
import { horizontalStackTokens, verticalStackTokens } from "../styles";

type CommentsProps = {
  assignment: ApiAssignment;
  token: string;
  userId: string;
};

export const Comments: React.FC<CommentsProps> = (props) => {
  const [commenters, setCommenters] = React.useState<ApiUser[]>([]);
  const [comments, setComments] = React.useState<ApiComment[]>([]);
  const [comment, setComment] = React.useState<string>("");
  const [error, setError] = React.useState<string>();

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
  }, [props.assignment, props.userId]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const uniqueCommenters = comments
        .map((comment) => {
          return comment.author_id;
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

      setCommenters(
        await Promise.all(
          uniqueCommenters.map(async (author_id: string): Promise<ApiUser> => {
            const response = await fetch(USER_URL(author_id));
            if (!response.ok) throw Error(`Error fetching user ${author_id}`);
            return response.json();
          })
        )
      );
    };
    fetchUsers();
  }, [comments, props.userId]);

  return (
    <Stack tokens={verticalStackTokens}>
      <Text variant="xxLargePlus">Comments</Text>
      {comments.map((comment) => {
        return (
          <Stack key={`comment-${comment.id}`}>
            <Stack
              horizontal
              tokens={horizontalStackTokens}
              verticalAlign="end"
            >
              <Text variant="large">
                {
                  commenters.find((user) => {
                    return user.id === comment.author_id;
                  })?.name
                }
              </Text>
              <Text>{comment.timestamp}</Text>
            </Stack>

            <Text variant="medium">{comment.text}</Text>
          </Stack>
        );
      })}
      <TextField
        onChange={(event, newValue) => setComment(newValue ? newValue : "")}
        multiline
        placeholder="Make a comment"
        value={comment}
      />
      <Stack horizontal horizontalAlign="end">
        <PrimaryButton
          onClick={async () => {
            if (comment) {
              let apiComment: ApiComment = {
                id: "",
                assignment_id: props.assignment.id,
                author_id: props.userId,
                student_id: props.userId,
                text: comment,
                timestamp: `${new Date().toLocaleString()}`,
              };
              const post: ApiCommentPost = {
                token: "",
                comment: apiComment,
              };
              const response = await fetch(COMMENT_URL, {
                body: JSON.stringify(post),
                headers: { "Content-Type": "application/json" },
                method: "POST",
              });
              if (response.ok) {
                apiComment.id = await response.json();
                setComments((old) => [...old, apiComment]);
                setComment("");
              } else {
                setError("Failed to make a new comment");
                console.log("Error");
              }
            }
          }}
          text="Comment"
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
    </Stack>
  );
};
