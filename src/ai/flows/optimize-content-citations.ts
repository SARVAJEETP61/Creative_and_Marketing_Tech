'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing content citations (internal and external links) using AI-driven suggestions, enhancing content authority and visibility in AI search results.
 *
 * - optimizeContentCitations - The main function to trigger the citation optimization flow.
 * - OptimizeContentCitationsInput - The input type for the optimizeContentCitations function.
 * - OptimizeContentCitationsOutput - The output type for the optimizeContentCitations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeContentCitationsInputSchema = z.object({
  content: z
    .string()
    .describe('The content to optimize citations for, in plain text or HTML format.'),
  primaryKeyword: z.string().describe('The primary keyword the content is targeting.'),
  industry: z.string().describe('The industry or niche of the content.'),
});
export type OptimizeContentCitationsInput = z.infer<
  typeof OptimizeContentCitationsInputSchema
>;

const OptimizeContentCitationsOutputSchema = z.object({
  suggestedInternalLinks: z
    .array(z.string())
    .describe('A list of suggested internal links to add to the content.'),
  suggestedExternalLinks: z
    .array(z.string())
    .describe('A list of suggested external links to add to the content.'),
  citationOpportunities: z
    .string()
    .describe('A tool to find and generate suitable citation opportunities.'),
  optimizedContentSnippet: z
    .string()
    .describe(
      'A snippet of the optimized content, with suggested citation improvements.'
    ),
});

export type OptimizeContentCitationsOutput = z.infer<
  typeof OptimizeContentCitationsOutputSchema
>;

export async function optimizeContentCitations(
  input: OptimizeContentCitationsInput
): Promise<OptimizeContentCitationsOutput> {
  return optimizeContentCitationsFlow(input);
}

const optimizeContentCitationsPrompt = ai.definePrompt({
  name: 'optimizeContentCitationsPrompt',
  input: {schema: OptimizeContentCitationsInputSchema},
  output: {schema: OptimizeContentCitationsOutputSchema},
  prompt: `You are an SEO specialist helping to optimize content for AI search visibility.

  The content is about: {{{primaryKeyword}}} in the {{{industry}}} industry.

  Analyze the following content and suggest improvements for internal and external links to enhance its authority and visibility in AI search results.

  Content:
  {{content}}

  Specifically, suggest:
  - A list of relevant internal links that could be added to the content.
  - A list of authoritative external links that could be added to the content.
  - Instructions on how to find and generate suitable citation opportunities in the content.
  - A snippet of the optimized content, showcasing the suggested citation improvements.

  Ensure your suggestions are practical and relevant to the content and industry.
  `,
});

const optimizeContentCitationsFlow = ai.defineFlow(
  {
    name: 'optimizeContentCitationsFlow',
    inputSchema: OptimizeContentCitationsInputSchema,
    outputSchema: OptimizeContentCitationsOutputSchema,
  },
  async input => {
    const {output} = await optimizeContentCitationsPrompt(input);
    return output!;
  }
);
