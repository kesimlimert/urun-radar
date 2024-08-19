import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export function Welcome() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Ürün Radar
          </h1>
          <p className="text-center">
            Ürün Radar is a platform that helps you track the end user written
            reviews of your favorite products. Login to get started!
          </p>
          <div className="px-2 mt-5">
            <h2 className="text-3xl mt-5 font-bold">Features</h2>
            <ul className="list-disc px-2 space-y-4 mt-5 list-inside">
              <li>
                <strong>Post Product Reviews:</strong> Users can write detailed reviews about any product they want. These reviews are then shared with the community.
              </li>
              <li>
                <strong>Community Voting:</strong> Other users can vote on these reviews. Well-written, transparent, and helpful reviews are pushed to the top, ensuring that the most reliable information is easily accessible.
              </li>
              <li>
                <strong>Earn Points:</strong> Reviewers earn points when their reviews receive votes. This gamified element encourages users to provide accurate and valuable insights, creating a trustworthy environment for everyone.
              </li>
              <li>
                <strong>Transparency First:</strong> The system is designed to highlight honest and detailed reviews, making it easier for users to find the most useful opinions on any product.
              </li>
            </ul>
          </div>
          <div className="px-2 mt-5 mb-20">
            <h2 className="text-3xl mt-5 font-bold">How It Works</h2>
            <ul className="list-disc px-2 space-y-4 mt-5 list-inside">
              <li>
                <strong>Sign Up:</strong> Create an account to start posting and voting on reviews.
              </li>
              <li>
                <strong>Review Products:</strong> Write reviews on any product you’ve used or are familiar with.
              </li>
              <li>
                <strong>Vote on Reviews:</strong> Browse reviews by other users and vote on those you find most helpful and transparent.
              </li>
              <li>
                <strong>Earn Points:</strong> Gain points based on the votes your reviews receive. The more helpful your review, the more points you earn!
              </li>
            </ul>
          </div>
          <Link className="mb-5 text-center underline" href="https://github.com/kesimlimert/urun-radar">View on GitHub</Link>
        </main>
      </div>
    </div>
  );
}
