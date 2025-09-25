'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating brand content.
 *
 * - `generateBrandContent`: Generates brand content based on user inputs.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateBrandContentInput,
  GenerateBrandContentInputSchema,
  GenerateBrandContentOutput,
  GenerateBrandContentOutputSchema,
} from '@/ai/schemas/generate-brand-content';

export async function generateBrandContent(
  input: GenerateBrandContentInput
): Promise<GenerateBrandContentOutput> {
  return generateBrandContentFlow(input);
}

const generateBrandContentPrompt = ai.definePrompt({
  name: 'generateBrandContentPrompt',
  input: { schema: GenerateBrandContentInputSchema },
  output: { schema: GenerateBrandContentOutputSchema },
  prompt: `
    You are an expert marketing copywriter. Generate content based on the following specifications.

    Brand Name: {{{brandName}}}
    Brand Tone: {{{brandTone}}}
    Content Type: {{{contentType}}}
    Length: {{{contentLength}}}

    {{#if campaignGoal}}
    Campaign Objective: {{{campaignGoal}}}
    {{/if}}

    {{#if keywords}}
    Keywords/Hashtags: {{{keywords}}}
    {{/if}}

    ---

    Instructions:
    1. Generate the requested '{{{contentType}}}'. It should be '{{{contentLength}}}' in length and have a '{{{brandTone}}}' tone.
    2. Incorporate the keywords '{{{keywords}}}' naturally (if provided).
    3. The content should be engaging and aligned with the campaign objective (if provided).

    Your final output should be a JSON object with a single 'content' field.
  `,
});

const generateBrandContentFlow = ai.defineFlow(
  {
    name: 'generateBrandContentFlow',
    inputSchema: GenerateBrandContentInputSchema,
    outputSchema: GenerateBrandContentOutputSchema,
  },
  async (input) => {
    const { output } = await generateBrandContentPrompt(input);
    return output!;
  }
);
