import { defineCollection, z } from 'astro:content';

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const services = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      primaryKeyword: z.string(),
      metaTitle: z.string(),
      metaDescription: z.string(),
      description: z.string(),
      intro: z.string(),
      included: z.array(z.string()),
      sectors: z.array(z.string()),
      relatedServices: z.array(z.string()).optional(),
      faqs: z.array(faqSchema),
      order: z.number(),
      icon: z.enum([
        'contract',
        'industrial',
        'kitchen',
        'duct',
        'window',
        'power',
        'floor',
        'road',
        'builders',
        'emergency',
        'office',
      ]),
      featured: z.boolean().optional(),
      parent: z.string().optional(),
      heroImage: image().optional(),
    }),
});

const sectors = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    primaryKeyword: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    description: z.string(),
    intro: z.string(),
    compliance: z.string(),
    services: z.array(z.string()),
    faqs: z.array(faqSchema),
    order: z.number(),
    featured: z.boolean().optional(),
    proofPoint: z.string().optional(),
  }),
});

const locations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    city: z.string(),
    primaryKeyword: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    description: z.string(),
    intro: z.string(),
    services: z.array(z.string()),
    sectors: z.array(z.string()),
    region: z.string(),
    area: z.enum(['republic', 'northern-ireland']).default('republic'),
    ukSitePath: z.string().optional(),
    faqs: z.array(faqSchema).min(3),
    proofPoint: z.string().optional(),
    order: z.number(),
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { services, sectors, locations, news };
