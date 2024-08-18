"use client";

import { IconSquareArrowUp } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  onUpvote: () => Promise<void>;
  isUpvoted: boolean;
};

export default function UpvoteButton({ onUpvote, isUpvoted }: Props) {
  const [iconColor, setIconColor] = useState(isUpvoted ? "gray" : "white");

  const iconColorChange = () => {
	if(iconColor === "white") {
		setIconColor("gray");
	}
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <form action={onUpvote}>
        <button onClick={iconColorChange}>
          <IconSquareArrowUp color={iconColor} stroke={2} size={48} />
		</button>
      </form>
    </div>
  );
}
