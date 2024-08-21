"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Filter from "../filters/Filter";

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
          className="flex p-5 mb-5 rounded-md bg-btn-background"
        >
          <div className="w-full flex justify-between">
            <div>
              <h2 className="md:text-2xl text-lg font-semibold">{review.title}</h2>
              <div className="flex items-center justify-between w-full gap-5 pt-3">
                <div className="flex gap-2 flex-wrap">
                  {review.tags.length > 0 && review.tags.map((tag: string) => (
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
              <div className="flex text-xs md:text-sm max-w-sm flex-col gap-2">
                <p>
                  <b>Created by:</b> {review.created_by}
                </p>
                <p>
                  <b>Votes: </b> {review.upvote ? review.upvote : 0}
                </p>
                <p>
                  <b>Comments: </b>{" "}
                  {review.comments ? review.comments.length : 0}
                </p>
                <p>
                  <b>Created at:</b> {dayjs(review.created_at).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
