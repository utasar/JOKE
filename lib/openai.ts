// OpenAI configuration and utilities
// This file would contain the OpenAI client setup in production

export interface AIReplyOptions {
  context: string
  style: 'funny' | 'witty' | 'charming'
  maxTokens?: number
}

export interface AIReplyResponse {
  reply: string
  safe: boolean
  model?: string
}

/**
 * Safety check for AI-generated content
 * Ensures responses are appropriate and ethical
 */
export function performContentSafetyCheck(content: string): { safe: boolean; reason?: string } {
  const unsafePatterns = [
    /\b(violence|violent|harm(ful)?|hurt(ing)?)\b/i,
    /\b(hate(ful)?|hatred|discriminate|discrimination)\b/i,
    /\b(illegal|crime|criminal|unlawful)\b/i,
    /\b(explicit|sexual|nsfw|pornographic)\b/i,
    /\b(offensive|insult(ing)?|derogatory|abusive)\b/i,
    /\b(threat(en)?|intimidat(e|ion)|harass(ment)?)\b/i,
  ]

  for (const pattern of unsafePatterns) {
    if (pattern.test(content)) {
      return { 
        safe: false, 
        reason: 'Content contains potentially inappropriate material' 
      }
    }
  }

  return { safe: true }
}

/**
 * In production, this would use the OpenAI SDK:
 * 
 * import OpenAI from 'openai'
 * 
 * const openai = new OpenAI({
 *   apiKey: process.env.OPENAI_API_KEY
 * })
 * 
 * export async function generateAIReply(options: AIReplyOptions): Promise<AIReplyResponse> {
 *   const systemPrompt = getSystemPrompt(options.style)
 *   
 *   const completion = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [
 *       { role: "system", content: systemPrompt },
 *       { role: "user", content: options.context }
 *     ],
 *     max_tokens: options.maxTokens || 150,
 *     temperature: 0.8,
 *   })
 *   
 *   const reply = completion.choices[0]?.message?.content || ''
 *   const safety = performContentSafetyCheck(reply)
 *   
 *   return {
 *     reply: safety.safe ? reply : 'Sorry, I couldn\'t generate an appropriate response.',
 *     safe: safety.safe,
 *     model: 'gpt-4'
 *   }
 * }
 */

function getSystemPrompt(style: 'funny' | 'witty' | 'charming'): string {
  const prompts = {
    funny: `You are a friendly, humorous AI assistant. Generate funny, lighthearted responses that make people laugh. 
            Keep responses appropriate, positive, and entertaining. Avoid sarcasm that could be hurtful.`,
    witty: `You are a clever, quick-witted AI assistant. Generate intelligent, witty responses with wordplay and clever observations. 
            Be smart and sophisticated while remaining friendly and approachable.`,
    charming: `You are a warm, charming AI assistant. Generate responses that are gracious, complimentary, and socially smooth. 
            Be genuine, kind, and make the other person feel valued and appreciated.`
  }
  
  return prompts[style] || prompts.funny
}

// Mock implementation for demo
export function generateMockAIReply(options: AIReplyOptions): AIReplyResponse {
  const reply = `[AI Reply Pro - ${options.style.toUpperCase()}] This is a demonstration response. In production, this would generate contextual ${options.style} responses using OpenAI GPT-4.`
  
  return {
    reply,
    safe: true,
    model: 'demo'
  }
}
