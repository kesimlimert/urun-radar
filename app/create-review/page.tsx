import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "@/components/SubmitButton";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { uploadImage } from "@/utils/cloudinary";
import { redirect } from "next/navigation";

export default function CreateReview() {
  const createReview = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const image = formData.get("image");
    const description = formData.get("description"); 
    const imageUrl = await uploadImage(image);
    
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("profile").select("display_name").eq("id", user?.id);
    const created_by = data?.[0].display_name;
    await supabase.from("reviews").insert(
      {
        title,
        description,
        image: imageUrl,
        created_by: created_by,
      });
    redirect("/");
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col w-full gap-20 max-w-4xl px-3">
        <main className="flex flex-col gap-5">
          <h2 className="font-bold text-4xl mb-4">Create review</h2>
          <p className="text-lg">
            Please write detailed and honest reviews. True reviews will be voted
            from community. All upvotes returns you as points.
          </p>
          <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <label className="text-md" htmlFor="title">
              Title
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="title"
              placeholder="Title"
              required
            />
            <label className="text-md" htmlFor="description">
              Description
            </label>
            <textarea
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="description"
              placeholder="Description"
              required
            />
            <label className="text-md" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="image"
              name="image"
            />
            <SubmitButton
              formAction={createReview}
              className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Creating..."
            >
              Create Review
            </SubmitButton>
            <Link href="/">
              <button className="rounded-md w-full px-4 py-2 text-black bg-red-500">
                Cancel
              </button>
            </Link>
          </form>
        </main>
      </div>
    </div>
  );
}
