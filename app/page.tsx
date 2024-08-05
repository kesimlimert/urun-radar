import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Welcome } from "@/app/welcome";
import { Navbar } from "@/components/Navbar";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
        <Welcome />
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-center">Signed in anasayfa</h1>
        </main>
      </div>
    </div>
  );
}
