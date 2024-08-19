import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/layout/Navbar";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconUser, IconNote, IconStars } from "@tabler/icons-react";
import Link from "next/link";
import ReviewsList from "@/components/reviews/ReviewsList";
import SearchProfile from "@/components/filters/SearchProfile";

dayjs.extend(relativeTime);

type Profile = {
  display_name: string;
  points: number;
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profile")
    .select()
    .eq("id", user.id);

  const { data: allProfiles } = await supabase
    .from("profile")
    .select();

  if (profileError) {
    console.error(profileError);
    return <div>Error loading profile</div>;
  }

  const profile = profileData[0];

  if (!profile.display_name) {
    redirect("/username");
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select(`id, title, created_by, created_at, comments, upvote, tags`)
    .eq("created_by", profile.display_name);

  if (reviewsError) {
    console.error(reviewsError);
    return <div>Error loading profile</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl w-full px-3">
        <main className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-3 w-full text-left">
            <h2 className="md:text-3xl text-2xl">{profile.display_name}</h2>
            <div className="flex flex-wrap gap-3 w-full max-w-md">
              <div className="flex gap-1 items-center">
                <IconUser />
                <p className="text-xs">
                  Member for {dayjs(profile.created_at).toNow(true)}
                </p>
              </div>
              {reviews.length > 0 ? (
                <div className="flex gap-1 items-center">
                  <IconNote />
                  <p className="text-xs">You have {reviews.length} reviews.</p>
                </div>
              ) : (
                <div className="flex gap-1 items-center">
                  <IconNote />
                  <p className="text-xs">No reviews created yet.</p>
                </div>
              )}
              <div className="flex gap-1 items-center">
                <IconStars />
                <p className="text-xs">You have {profile.points} points.</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-bold mt-3">
              Search Profile
            </h2>
            <SearchProfile profiles={allProfiles} />
          </div>
          {reviews.length > 0 ? (
            <>
              <h2 className="text-3xl md:text-4xl mt-4 font-bold">
                Your reviews
              </h2>
              <ReviewsList reviews={reviews} />
            </>
          ) : (
            <>
              <h2 className="text-4xl mt-8 font-bold">
                Looks like you dont have review. Lets create new one!
              </h2>
              <Link
                className="rounded-full max-w-sm text-center px-4 py-2 text-black bg-gray-200 hover:bg-white"
                href="/create-review"
              >
                Create new review
              </Link>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
