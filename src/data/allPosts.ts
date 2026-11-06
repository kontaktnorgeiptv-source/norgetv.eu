import { BlogPost } from "./blogPosts";
import { SV_BLOG_POSTS_1 } from "./svBlogPosts1";

// Swedish blog corpus. The former German/Dutch sample posts have been removed;
// the blog now ships a focused set of Swedish articles for the Nordic market.
// Add further batches here.
export const ALL_POSTS: BlogPost[] = [...SV_BLOG_POSTS_1].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}
