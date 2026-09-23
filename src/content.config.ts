import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const img = z.string();

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.object({
    siteName: z.string(),
    tagline: z.string().optional(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    logo: img,
    logoIcon: img.optional(),
    logoDark: img.optional(),
    phone: z.string(),
    phoneLink: z.string(),
    email: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    openingHours: z.string(),
    kvk: z.string().optional(),
    legalName: z.string().optional(),
    formEmail: z.string(),
    formEndpoint: z.string().optional(),
    ctaLabel: z.string(),
    ctaLink: z.string(),
    reboowUrl: z.string().optional(),
    serviceArea: z.string().optional(),
    socials: z.array(z.object({ platform: z.string(), url: z.string() })).default([]),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    footerBedrijf: z.array(z.object({ label: z.string(), href: z.string() })),
    footerSupport: z.array(z.object({ label: z.string(), href: z.string() })),
    footerJuridisch: z.array(z.object({ label: z.string(), href: z.string() })),
    footerBottom: z.array(z.object({ label: z.string(), href: z.string() })),
    copyright: z.string(),
    inzetTitle: z.string(),
    inzet: z.array(z.object({ label: z.string(), icon: z.string() })),
    behandelplanTitle: z.string(),
    behandelplan: z.array(z.object({ title: z.string(), text: z.string() })),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.any(),
});

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/diensten' }),
  schema: z.object({
    title: z.string(),
    titleHtml: z.string().optional(),
    tagline: z.string(),
    short: z.string(),
    icon: z.string(),
    image: img.optional(),
    imageAlt: z.string().optional(),
    order: z.number().default(0),
    slug: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    relatedCases: z.array(z.string()).optional(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    subtitle: z.string(),
    intro: z.string(),
    summary: z.string(),
    image: img,
    imageAlt: z.string().optional(),
    imageIsLogo: z.boolean().default(false),
    stats: z.array(z.object({ value: z.string(), label: z.string(), icon: z.string() })).max(3),
    challenge: z.string(),
    approach: z.string(),
    results: z.array(z.string()),
    closing: z.string().optional(),
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: img.optional(),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    author: z.string().default('De Machinedokters'),
    readingTime: z.string().optional(),
    excerpt: z.string(),
    cover: img,
    coverAlt: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/reviews' }),
  schema: z.object({
    name: z.string(),
    company: z.string().optional(),
    order: z.number().default(0),
  }),
});

const clients = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/klanten' }),
  schema: z.object({
    name: z.string(),
    logo: img,
    order: z.number().default(0),
  }),
});

const vacancies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/vacatures' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string(),
    sector: z.string(),
    image: img.optional(),
    quote: z.string().optional(),
    intro: z.string(),
    functie: z.string(),
    watGaJeDoen: z.array(z.string()),
    watWijBieden: z.array(z.string()),
    watJeMeebrengt: z.array(z.string()),
    published: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/juridisch' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    intro: z.string().optional(),
    questionTitle: z.string().optional(),
    questionText: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { settings, pages, services, cases, team, faq, blog, testimonials, clients, vacancies, legal };
