import { createClient } from "@/utils/supabase/server";
import { Welcome } from "@/app/welcome";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select(`id, title, created_by, comments, upvote, tags`);

  console.log(reviews);

  if (!user) {
    return <Welcome />;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <main className="w-full flex flex-col gap-20 max-w-4xl px-3">
        <div className="flex w-full justify-between">
          <h1 className="text-4xl font-bold">Top product reviews</h1>
          <Link href="/create-review">
            <button className="rounded-md px-4 py-2 text-black bg-gray-200 hover:bg-white">
              Create new review
            </button>
          </Link>
        </div>
        {reviews && reviews.length > 0 ? (
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="flex p-5 mb-2 bg-btn-background">
                <div className="w-full">
                  <h2 className="text-2xl font-semibold">{review.title}</h2>
                  <div className="flex items-center justify-between w-full gap-5 pt-3">
                    <div className="flex gap-2">
                      {review.tags.map((tag: string) => (
                        <span key={tag} className="px-4 py-1 bg-neutral-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm text-gray-400">
                        <b>Created by:</b> {review.created_by}
                      </p>
                      <p className="text-sm text-gray-400 ml-2"><b>Votes: </b> {review.upvote ? review.upvote : 0}</p>
                      <p className="text-sm text-gray-400 ml-2"><b>Comments: </b> {review.comments ? review.comments.length : 0}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-l">No posts available</p>
        )}
      </main>
    </div>
  );
}
