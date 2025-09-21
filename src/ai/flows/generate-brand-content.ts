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
