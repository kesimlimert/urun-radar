import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";



export default async function UpdateReview({ params } : { params: { reviewId: string } }) {
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

	  if (reviewOwnerData?.[0].id !== user?.id) {
		throw new Error("You are not the owner of this review");
	  }
	
	  const review = reviewData[0];

	  const updateRevies = async (formData: FormData) => {
		"use server";
		const description = formData.get("description"); 
		const supabase = createClient();
		await supabase.from("reviews").update(
		  {
			description : description,
		  })
		  .eq("id", params.reviewId);
		redirect(`/reviews/${params.reviewId}`);
	  };
	return (
		<div className="flex-1 w-full flex flex-col gap-20 mb-20 items-center">
		  <div className="w-full">
			<Navbar />
		  </div>
	
		  <div className="flex-1 flex flex-col w-full gap-20 max-w-4xl px-3">
			<main className="flex flex-col gap-5">
			  <h2 className="font-bold text-4xl mb-4">{review.title}</h2>
			  <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
				<label className="text-md" htmlFor="description">
				  Description
				</label>
				<textarea
				  className="rounded-md px-4 py-2 bg-inherit border mb-6"
				  name="description"
				  placeholder={review.description}
				  required
				  rows={10}
				/>
				<SubmitButton
				formAction={updateRevies}
				  className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
				  pendingText="Creating..."
				>
				  Update review
				</SubmitButton>
				<Link href={"reviews/" + params.reviewId}>
				  <button className="rounded-md w-full px-4 py-2 mb-6 text-black bg-red-500">
					Cancel
				  </button>
				</Link>
			  </form>
			</main>
		  </div>
		</div>
	  );
}