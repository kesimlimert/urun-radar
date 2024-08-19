import { createClient } from "@/utils/supabase/server";
import { Welcome } from "@/app/welcome";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import ReviewsList from "@/components/reviews/ReviewsList";

dayjs.extend(relativeTime);

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select(`id, title, created_by, created_at, comments, upvote, tags`);

  if (!user) {
    return <Welcome />;
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col mt-20 max-w-4xl px-3">
        <div className="flex w-full mb-10 justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">Top product reviews</h1>
          <Link href="/create-review">
            <button className="rounded-md md:text-base text-xs px-2 md:px-4 whitespace-nowrap py-2 text-black bg-gray-200 hover:bg-white">
              Create review
            </button>
          </Link>
        </div>
        {reviews && reviews.length > 0 ? (
          <ReviewsList reviews={reviews} />
        ) : (
          <p className="text-l">No posts available</p>
        )}
      </main>
    </div>
  );
}
