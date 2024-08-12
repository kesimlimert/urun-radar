import { SubmitButton }  from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default function Username({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const setDisplayName = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const displayName = formData.get("display_name") as string;

    const { error } = await supabase
      .from('profile')
      .update({ display_name: displayName })
      .eq('id', user?.id);

    if (error) {
      console.error(error);
      return redirect("/profile?message=Could not set this display name");
    }

    return redirect("/");

  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 items-center justify-center gap-2">
      <div className="w-full sm:max-w-xl">
        <h2 className="font-bold text-4xl mb-4">
          Please set your display name
        </h2>
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="display_name">
            Display Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="display_name"
            placeholder="Display Name"
            required
          />
          <SubmitButton
            formAction={setDisplayName}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Setting..."
          >
            Set Display Name
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
