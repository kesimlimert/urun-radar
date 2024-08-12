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
    .select(`id, title, description, created_by, created_at, image, upvote`);

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
              <div key={review.id} className="flex">
                <div>
                <h2 className="text-2xl font-semibold">{review.title}</h2>
                <p className="whitespace-pre-line">{review.description}</p>
                {/* Add other post details here */}
                </div>
                <div>
                  <Image
                    src={review.image}
                    width={200}
                    height={200}
                    quality={100}
                    alt={review.title}
                  />
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
