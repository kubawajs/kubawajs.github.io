// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Define your collection(s)
const work = defineCollection({
    loader: glob({ pattern: "*.md", base: "src/content/work" }),
    schema: z.object({
        title: z.string(),
        role: z.string(),
        category: z.string(),
        technologies: z.array(z.string()),
        description: z.string(),
        publishDate: z.coerce.date(),
        project_url: z.string().optional(),
    }),
});
const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.date(),
        tags: z.array(z.string()),
        img: z.string().optional(),
        img_alt: z.string().optional(),
    }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blog, work };