// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "src/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
