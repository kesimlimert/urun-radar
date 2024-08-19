import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const { data: profileData } = await supabase
    .from("profile")
    .select()
    .eq("id", user?.id);

  const userName = profileData && profileData[0]?.display_name;
  const points = profileData && profileData[0]?.points;

  return user ? (
    <div className="flex items-center gap-4">
      <p className="text-xs md:block hidden">
        {userName ? userName + " - " + points + " points" : user.email}
      </p>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-3">
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </div>
  );
}
