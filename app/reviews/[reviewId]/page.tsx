import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import Image from "next/image";
import UpvoteButton from "@/components/buttons/UpvoteButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { revalidatePath } from "next/cache";

dayjs.extend(relativeTime);

export default async function Review({
  params,
}: {
  params: { reviewId: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: reviewData, error } = await supabase
    .from("reviews")
    .select()
    .eq("id", params.reviewId);

  if (error) {
    throw new Error(error.message);
  }

  if (reviewData?.length === 0) {
    throw new Error("Review not found");
  }

  const { data: reviewOwnerData } = await supabase
    .from("profile")
    .select()
    .eq("display_name", reviewData[0].created_by);

  if (reviewOwnerData?.length === 0) {
    throw new Error("Review owner not found");
  }

  const review = reviewData[0];
  const reviewOwner = reviewOwnerData?.[0];
  const upvotedBy = reviewData[0].upvoted_by ?? [];
  const upvoted = upvotedBy.includes(user?.id);
  
  const createComment = async (formData: FormData) => {
    "use server";
    const comment = formData.get("comment");
    const supabase = createClient();
    const comments = reviewData?.[0]?.comments ?? [];
    await supabase
      .from("reviews")
      .update({
        comments: [...comments, comment],
      })
      .eq("id", params.reviewId);
    revalidatePath(`/reviews/${params.reviewId}`);
  };
  
  const handleUpvote = async () => {
    "use server";
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("upvoted_by")
      .eq("id", params.reviewId)
      .single();
  
    const upvotedBy = data?.upvoted_by ?? [];
    const upvoted = !upvotedBy.includes(user?.id);

    if (upvoted) {
      await supabase
        .from("reviews")
        .update({
          upvote: review.upvote + 1,
          upvoted_by: [...upvotedBy, user?.id],
        })
        .eq("id", params.reviewId);

      await supabase
        .from("profile")
        .update({
          points: reviewOwner.points + 10,
        })
        .eq("id", reviewOwner.id);

      revalidatePath(`/reviews/${params.reviewId}`);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col mt-20 max-w-4xl px-3">
        <div className="flex w-full mb-10 justify-between">
          <h1 className="text-4xl font-bold">{review.title}</h1>
          {reviewOwner.id === user?.id && (
            <Link href={"/update-review/" + params.reviewId}>
              <button className="rounded-md px-4 py-2 text-black bg-gray-200 hover:bg-white">
                Update review
              </button>
            </Link>
          )}
        </div>
        <div className="flex mt-10 gap-5">
          <Image
            src={review.image}
            alt={review.title}
            quality={100}
            width={200}
            height={200}
            className="rounded-md w-1/3"
          />
          <div className="flex-1 flex justify-between flex-col gap-5">
            <p className="whitespace-pre-line">{review.description}</p>
            <div className="flex gap-5">
              <div className="flex text-sm flex-col gap-2">
                <p>Created by: {review.created_by}</p>
                <p>Created at: {dayjs(review.created_at).fromNow()}</p>
              </div>
              <div className="flex text-sm flex-col gap-2">
                <p>Votes: {review.upvote ? review.upvote : 0}</p>
                <p>Comments: {review.comments ? review.comments.length : 0}</p>
              </div>
            </div>
          </div>
          {reviewOwner.id !== user?.id && (
            <UpvoteButton isUpvoted={upvoted} onUpvote={handleUpvote} />
          )}
        </div>
        <div className="flex flex-col gap-5 mt-10 mb-20">
          {reviewOwner.id !== user?.id && (
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              <textarea
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="comment"
                placeholder="Your comment"
                required
                rows={5}
              />
              <SubmitButton
                formAction={createComment}
                className="border border-foreground/20 max-w-40 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Creating..."
              >
                Add Comment
              </SubmitButton>
            </form>
          )}
          <h2 className="text-2xl ml-1 font-semibold">Comments</h2>
          {review.comments ? (
            review.comments.map((comment: string, index: number) => (
              <div key={index} className="flex bg-btn-background p-5 gap-5">
                <p>{comment}</p>
              </div>
            ))
          ) : (
            <p className="mt-3">No comments yet</p>
          )}
        </div>
      </main>
    </div>
  );
}
