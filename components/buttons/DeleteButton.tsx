import { IconTrash } from "@tabler/icons-react";

type DeleteButtonProps = {
  deleteReview: () => Promise<void>;
};

export default function DeleteButton({ deleteReview }: DeleteButtonProps) {
  return (
    <form action={deleteReview}>
      <button className="px-1 py-1 rounded-md bg-red-400">
        <IconTrash size={16} color="white" />
      </button>
    </form>
  );
}
