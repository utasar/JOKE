import { NextResponse } from 'next/server'

interface ReplyRequest {
  context: string
  style: 'funny' | 'witty' | 'charming'
  safetyCheck?: boolean
}

// AI safety keywords to filter out inappropriate content
const UNSAFE_KEYWORDS = [
  'violence', 'violent', 'harm', 'harmful', 'hurt',
  'hate', 'hatred', 'discriminate', 'discrimination',
  'harass', 'harassment', 'illegal', 'threat', 'threaten',
  'explicit', 'offensive', 'abusive'
]

function performSafetyCheck(text: string): { safe: boolean; reason?: string } {
  const lowerText = text.toLowerCase()
  
  for (const keyword of UNSAFE_KEYWORDS) {
    if (lowerText.includes(keyword)) {
      return { 
        safe: false, 
        reason: `Content contains potentially unsafe material related to: ${keyword}` 
      }
  }
  }
  
  return { safe: true }
}

function generateReply(context: string, style: 'funny' | 'witty' | 'charming'): string {
  // This is a mock implementation. In production, this would use OpenAI API
  // For demo purposes, we'll generate contextual responses based on style
  
  const replies = {
    funny: [
      "I'd tell you a joke about that, but I'm afraid it might go over your head... just like my high school grades!",
      "You know what's funny about that? Everything! Well, almost everything.",
      "That reminds me of the time I tried to be serious... didn't work out, as you can see!",
      "If laughter is the best medicine, you're about to be very healthy!",
    ],
    witty: [
      "Ah, I see you're a person of taste and sophistication... or at least good at faking it!",
      "That's quite observant. Are you always this sharp, or did you just have coffee?",
      "Well, that's one way to look at it. The other 47 ways are also interesting!",
      "I appreciate your perspective. It's wrong, but I appreciate it!",
    ],
    charming: [
      "You know, talking with you is the highlight of my day. And I had coffee this morning, so that's saying something!",
      "I must say, you have impeccable taste in conversation partners. Very discerning!",
      "Your insight is as refreshing as a cool breeze on a summer day.",
      "I find myself quite drawn to your way of thinking. It's both intriguing and delightful!",
    ]
  }
  
  const styleReplies = replies[style] || replies.funny
  const randomReply = styleReplies[Math.floor(Math.random() * styleReplies.length)]
  
  return randomReply
}

export async function POST(request: Request) {
  try {
    const body: ReplyRequest = await request.json()
    const { context, style, safetyCheck = true } = body

    if (!context || !style) {
      return NextResponse.json(
        { error: 'Missing required fields: context and style' },
        { status: 400 }
      )
    }

    // Perform safety check on input
    if (safetyCheck) {
      const contextSafety = performSafetyCheck(context)
      if (!contextSafety.safe) {
        return NextResponse.json(
          { 
            error: 'Content safety check failed',
            reason: contextSafety.reason,
            safe: false
          },
          { status: 400 }
        )
      }
    }

    // Generate reply
    const reply = generateReply(context, style)

    // Perform safety check on output
    if (safetyCheck) {
      const replySafety = performSafetyCheck(reply)
      if (!replySafety.safe) {
        return NextResponse.json(
          { 
            error: 'Generated content failed safety check',
            reason: replySafety.reason,
            safe: false
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      style,
      safe: true,
      note: 'This is a demo response. In production, this would use OpenAI GPT-4 API.'
    })

  } catch (error) {
    console.error('Error in AI reply:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
