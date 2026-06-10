import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    pubDate: z.date(),
    category: z.string(),
    categoryEn: z.string().optional(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    order: z.number().default(0),
    type: z.enum(['house', 'condo', 'supervision', 'defect']),
    tagTh: z.string(),
    tagEn: z.string(),
    title: z.string(),
    titleEn: z.string(),
    areaTh: z.string(),
    areaEn: z.string(),
    size: z.string(),
    serviceTh: z.string(),
    serviceEn: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, portfolio };
