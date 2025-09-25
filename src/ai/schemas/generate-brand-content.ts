/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the 'generateBrandContent' flow.
 *
 * - `GenerateBrandContentInputSchema`: The Zod schema for the input of the `generateBrandContent` function.
 * - `GenerateBrandContentInput`: The TypeScript type inferred from the input schema.
 * - `GenerateBrandContentOutputSchema`: The Zod schema for the output of the `generateBrandContent` function.
 * - `GenerateBrandContentOutput`: The TypeScript type inferred from the output schema.
 */

import { z } from 'zod';


export const GenerateBrandContentInputSchema = z.object({
  brandName: z.string().describe("The name of the brand."),
  brandTone: z.enum(["Witty", "Professional", "Friendly"]).describe("The desired tone for the content."),
  contentType: z.enum(["Instagram Caption", "Blog Post", "Ad Copy"]).describe("The type of content to generate."),
  campaignGoal: z.string().optional().describe("The optional campaign objective."),
  keywords: z.string().optional().describe("Optional comma-separated keywords or hashtags."),
  contentLength: z.enum(["Short", "Medium", "Long"]).describe("The desired length of the content."),
});


export type GenerateBrandContentInput = z.infer<typeof GenerateBrandContentInputSchema>;

export const GenerateBrandContentOutputSchema = z.object({
  content: z.string().describe('The generated brand content.'),
});

export type GenerateBrandContentOutput = z.infer<typeof GenerateBrandContentOutputSchema>;
