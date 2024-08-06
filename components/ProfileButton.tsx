import React from "react";
import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link href="/createProfile">
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Profile
      </button>
    </Link>
  );
}
