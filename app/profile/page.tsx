import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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

  if (profileError) {
    console.error(profileError);
    return <div>Error loading profile</div>;
  }

  const profile = profileData[0];

  if (!profile.display_name) {
    redirect("/username");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          <FetchDataSteps />
        </main>
      </div>
    </div>
  );
}
