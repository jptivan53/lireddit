import { useDeletePostByIdMutation, useMeQuery } from "@/generated/graphql";
import { Box, IconButton, Link } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();

  const [deletePostById] = useDeletePostByIdMutation();

  if (meData?.me?.id !== creatorId) return null;

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`} passHref>
        <IconButton
          isRound
          mr={2}
          as={Link}
          variant="ghost"
          icon={<EditIcon />}
          colorScheme="cyan"
          aria-label="Edit post"
        />
      </NextLink>

      <IconButton
        isRound
        variant="ghost"
        icon={<DeleteIcon />}
        colorScheme="red"
        aria-label="Delete post"
        onClick={() => {
          deletePostById({
            variables: { id },
            update: (cache) => {
              cache.evict({
                id: "Post:" + id,
              });
            },
          });
        }}
      />
    </Box>
  );
};
