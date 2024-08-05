import { createClient } from '@/utils/supabase/server';

export default async function Posts() {
  const supabase = createClient();
  const { data: posts, error: postsError } = await supabase.from("posts").select();

  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}