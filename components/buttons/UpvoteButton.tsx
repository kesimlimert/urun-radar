"use client";

import { IconSquareArrowUp } from "@tabler/icons-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  onUpvote: () => Promise<boolean>;
  isUpvoted: boolean;
};

export default function UpvoteButton({ onUpvote, isUpvoted }: Props) {
  console.log(isUpvoted);
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
