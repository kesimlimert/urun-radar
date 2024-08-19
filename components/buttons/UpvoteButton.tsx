"use client";

import { IconArrowUp } from '@tabler/icons-react';
import { useState } from "react";

type Props = {
  onUpvote: () => Promise<void>;
  isUpvoted: boolean;
};

export default function UpvoteButton({ onUpvote, isUpvoted }: Props) {
  const [iconColor, setIconColor] = useState(isUpvoted ? "bg-white" : "bg-transparent");
  const [color, setColor] = useState(isUpvoted ? "black" : "white");
  const [animation, setAnimation] = useState("");

  const iconColorChange = () => {
    if (iconColor === "bg-transparent") {
      setIconColor("bg-white");
      setColor("black");
      setAnimation("animate-bounce");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <form action={onUpvote}>
        <button className={`px-2 py-2 border border-white rounded-full ${iconColor} ${animation}`} onClick={iconColorChange}>
          <IconArrowUp color={color} size={32} />
        </button>
      </form>
    </div>
  );
}
