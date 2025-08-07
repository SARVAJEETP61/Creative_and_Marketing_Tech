'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating brand content.
 *
 * - `generateBrandContent`: Generates brand content based on user inputs.
 * - `GenerateBrandContentInput`: The input type for the `generateBrandContent` function.
 * - `GenerateBrandContentOutput`: The output type for the `generateBrandContent` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateBrandContentInputSchema = z.object({
  brandName: z.string().describe('The name of the brand.'),
  brandTone: z.enum(['Witty', 'Professional', 'Friendly']).describe('The desired tone for the content.'),
  contentType: z.enum(['Instagram Caption', 'Blog Post', 'Ad Copy']).describe('The type of content to generate.'),
  campaignGoal: z.string().optional().describe('The optional campaign objective.'),
  keywords: z.string().optional().describe('Optional comma-separated keywords or hashtags.'),
  contentLength: z.enum(['Short', 'Medium', 'Long']).describe('The desired length of the content.'),
  enableGenAIStructure: z.boolean().describe('Whether to optimize the structure for GenAI visibility.'),
  simulatePrompt: z.boolean().describe('Whether to simulate how the content might appear in an AI prompt response.'),
});
export type GenerateBrandContentInput = z.infer<typeof GenerateBrandContentInputSchema>;

export const GenerateBrandContentOutputSchema = z.object({
  content: z.string().describe('The generated brand content.'),
  promptSimulation: z.string().optional().describe('A simulation of the content within an AI prompt response.'),
});
export type GenerateBrandContentOutput = z.infer<typeof GenerateBrandContentOutputSchema>;

export async function generateBrandContent(input: GenerateBrandContentInput): Promise<GenerateBrandContentOutput> {
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
    1.  Generate the requested '{{{contentType}}}'. It should be '{{{contentLength}}}' in length and have a '{{{brandTone}}}' tone.
    2.  Incorporate the keywords '{{{keywords}}}' naturally.
    3.  The content should be engaging and aligned with the campaign objective: '{{{campaignGoal}}}'.

    {{#if enableGenAIStructure}}
    4.  **GenAI Optimization**: Structure the content to be easily understandable and citable by Generative AI models. Use clear headings, bullet points, and answer potential user questions directly. Make sure to mention the brand '{{{brandName}}}' in a natural way that an AI would pick up when answering a relevant user query.
    {{/if}}

    {{#if simulatePrompt}}
    5.  **Prompt Simulation**: After generating the content, create a separate section that simulates how a large language model (like ChatGPT or Gemini) might use this content to answer a user's query. Frame it like this:

        User Query: "What's a good brand for [a relevant topic from the content]?"

        AI Response: "...[a plausible AI response that seamlessly integrates a mention of '{{{brandName}}}' and its generated content]..."
    {{/if}}

    Your final output should be a JSON object with 'content' and an optional 'promptSimulation' field.
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
