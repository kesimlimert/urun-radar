# Urun Radar

Urun Radar is a web application that allows users to write and read honest product reviews. Users can sign in to the app and post their own reviews, which can then be read, commented on, and upvoted by other signed-in users.

## Key Features

- **Write Reviews**: Signed-in users can write reviews for products, including adding images and tags.
- **Read Reviews**: All signed-in users can read the reviews written by others, sorted by the number of upvotes.
- **Comment on Reviews**: Users can leave comments on any review to provide additional feedback or ask questions.
- **Upvote Reviews**: Users can upvote reviews they find helpful, and the review owner earns points for each upvote.
- **Search Reviews**: Users can search for reviews by tag or user profile.
- **Search Profile**: Users can search for profiles to check user reviews or total points gained from upvotes.

## Technologies Used

- **Next.js**: A React framework for building server-rendered, static, and dynamic websites and applications.
- **Supabase**: An open-source alternative to Firebase, providing a full backend solution including authentication, real-time database, and storage.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom user interfaces.

## Getting Started

1. Clone the repository: `git clone https://github.com/kesimlimert/urun-radar.git`
2. Install dependencies: `npm install`
3. Set up your Supabase environment:
   - Create a new Supabase project
   - Copy the project URL and API key to your `.env.local` file
4. Start the development server: `npm run dev`
5. Open the app in your browser: `http://localhost:3000`
