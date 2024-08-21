import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

dayjs.extend(relativeTime);

type ReviewItemProps = {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
  comments: string[];
  upvote: number;
  tags: string[];
};

export default function ReviewsItem({
  id,
  title,
  created_by,
  created_at,
  comments,
  upvote,
  tags,
}: ReviewItemProps) {

  const deleteReview = async () => {
    "use server";

	const supabase = createClient();

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
    }
    revalidatePath("/profile");
  };

  return (
    <>
      <div className="flex">
        <Link
          href={"reviews/" + id}
          className="flex w-full rounded-md p-5 mb-5 bg-btn-background"
        >
          <div className="w-full flex justify-between">
            <div className="flex flex-col">
              <h2 className="md:text-2xl text-lg font-semibold">{title}</h2>
              <div className="flex items-center justify-between w-full gap-5 pt-3">
                <div className="flex gap-2 flex-wrap">
                  {tags.length > 0  && tags.map((tag: string) => (
                     tag.trim() !== '' && (
                      <span
                        key={tag}
                        className="px-4 py-1 md:text-lg bg-white text-black rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex text-xs md:text-sm flex-col gap-2">
                <p>
                  <b>Created by:</b> {created_by}
                </p>
                <p>
                  <b>Votes: </b> {upvote ? upvote : 0}
                </p>
                <p>
                  <b>Comments: </b> {comments ? comments.length : 0}
                </p>
                <p>
                  <b>Created at: </b> {dayjs(created_at).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex-1 bg-btn-background mb-5 pr-5 flex flex-col justify-center">
          <DeleteButton deleteReview={deleteReview} />
        </div>
      </div>
    </>
  );
}
