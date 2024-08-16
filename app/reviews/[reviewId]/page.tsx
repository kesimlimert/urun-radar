import { createClient } from "@/utils/supabase/server"
export default async function Review({ params }: { params: { reviewId: string } }) {

	const supabase = createClient();
	const { data, error } = await supabase.from("reviews").select().eq("id", params.reviewId);
	
	if (data?.length === 0) {
		throw new Error("Review not found");
	}

	return (
		<div>
			<h1>Review {params.reviewId}</h1>
		</div>
	)
}