"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Filter from "../Filter";

dayjs.extend(relativeTime);

type Review = {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
  comments: string[];
  upvote: number;
  tags: string[];
};

type ReviewsListItemProps = {
  reviews: Review[];
};

export default function ReviewsList({ reviews }: ReviewsListItemProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const allTags = Array.from(new Set(reviews.flatMap((review) => review.tags)));

  const filteredReviews = selectedTag
    ? reviews.filter((review) => review.tags.includes(selectedTag))
    : reviews;

  return (
    <>
      <Filter
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />
      {filteredReviews.map((review) => (
        <Link
          key={review.id}
          href={"reviews/" + review.id}
          className="flex p-5 mb-5 bg-btn-background"
        >
          <div className="w-full">
            <h2 className="text-2xl font-semibold">{review.title}</h2>
            <div className="flex items-center justify-between w-full gap-5 pt-3">
              <div className="flex gap-2">
                {review.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-neutral-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 flex-col">
                <div className="flex gap-2">
                  <p className="text-sm text-gray-400">
                    <b>Created by:</b> {review.created_by}
                  </p>
                  <p className="text-sm text-gray-400 ml-2">
                    <b>Votes: </b> {review.upvote ? review.upvote : 0}
                  </p>
                  <p className="text-sm text-gray-400 ml-2">
                    <b>Comments: </b>{" "}
                    {review.comments ? review.comments.length : 0}
                  </p>
                </div>
                <div className="text-xs text-right text-gray-400">
                  <p>Created at: {dayjs(review.created_at).fromNow()}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
