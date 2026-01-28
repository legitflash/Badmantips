'use server';

import { assessTipQuality } from "@/ai/flows/assess-tip-quality";
import type { AssessTipQualityOutput } from "@/ai/flows/assess-tip-quality";

export async function getQualityAssessment(tipContent: string): Promise<AssessTipQualityOutput> {
  if (!tipContent || tipContent.trim().length < 5) {
    return {
      isHighQuality: false,
      qualityAssessment: 'The tip content is too short or empty to provide a meaningful analysis. High-quality tips usually contain detailed reasoning.'
    };
  }
  
  try {
    const assessment = await assessTipQuality({ tipContent });
    return assessment;
  } catch (error) {
    console.error("AI Quality Assessment Failed:", error);
    return {
      isHighQuality: false,
      qualityAssessment: 'An error occurred while assessing the tip. The AI service may be unavailable. Please try again later.'
    };
  }
}
