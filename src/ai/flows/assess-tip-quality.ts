'use server';

/**
 * @fileOverview An AI agent for assessing the quality and reliability of prediction tips.
 *
 * - assessTipQuality - A function that assesses the quality of a prediction tip.
 * - AssessTipQualityInput - The input type for the assessTipQuality function.
 * - AssessTipQualityOutput - The return type for the assessTipQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessTipQualityInputSchema = z.object({
  tipContent: z.string().describe('The content of the prediction tip.'),
});
export type AssessTipQualityInput = z.infer<typeof AssessTipQualityInputSchema>;

const AssessTipQualityOutputSchema = z.object({
  isHighQuality: z.boolean().describe('Whether the prediction tip is of high quality and reliable.'),
  qualityAssessment: z.string().describe('A detailed assessment of the tip quality, including reasons for the assessment.'),
});
export type AssessTipQualityOutput = z.infer<typeof AssessTipQualityOutputSchema>;

export async function assessTipQuality(input: AssessTipQualityInput): Promise<AssessTipQualityOutput> {
  return assessTipQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessTipQualityPrompt',
  input: {schema: AssessTipQualityInputSchema},
  output: {schema: AssessTipQualityOutputSchema},
  prompt: `You are an AI data curator responsible for assessing the quality and reliability of prediction tips.

  You will evaluate the provided tip content based on factors such as content length, completeness (absence of missing values or keys), and overall clarity.

  Based on your assessment, determine whether the tip is of high quality and reliable. Explain the reasons for your assessment in detail.

  Tip Content: {{{tipContent}}}`,
});

const assessTipQualityFlow = ai.defineFlow(
  {
    name: 'assessTipQualityFlow',
    inputSchema: AssessTipQualityInputSchema,
    outputSchema: AssessTipQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
