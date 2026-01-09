'use client'

import { useState } from 'react'
import { ArrowLeft, Send, Lightbulb, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface Scenario {
  id: number
  title: string
  description: string
  context: string
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Starting a Conversation',
    description: 'Practice breaking the ice at a social event',
    context: 'You\'re at a networking event and want to start a conversation with someone standing alone.'
  },
  {
    id: 2,
    title: 'Job Interview Small Talk',
    description: 'Master the art of professional conversation',
    context: 'You\'re waiting in the lobby before your job interview and the interviewer comes to greet you.'
  },
  {
    id: 3,
    title: 'First Date Conversation',
    description: 'Keep the conversation flowing on a first date',
    context: 'You\'re on a first date at a coffee shop and there\'s a brief lull in the conversation.'
  },
  {
    id: 4,
    title: 'Handling Awkward Moments',
    description: 'Learn to gracefully navigate uncomfortable situations',
    context: 'Someone just told a joke that fell flat and there\'s an awkward silence.'
  },
]

export default function SocialLab() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setMessages([
      {
        role: 'system',
        content: `Scenario: ${scenario.title}\n\n${scenario.context}\n\nWhat would you say?`
      }
    ])
    setScore(0)
    setAttempts(0)
  }

  const handleSend = async () => {
    if (!input.trim() || !selectedScenario) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)
    setAttempts(attempts + 1)

    // Simulate AI response with analysis
    setTimeout(() => {
      const feedback = generateFeedback(input, selectedScenario)
      const aiMessage: Message = {
        role: 'assistant',
        content: feedback.message
      }
      setMessages(prev => [...prev, aiMessage])
      setScore(score + feedback.points)
      setIsLoading(false)
    }, 1500)
  }

  const generateFeedback = (userInput: string, scenario: Scenario) => {
    // Simple AI simulation - in production this would call OpenAI API
    const length = userInput.length
    const hasQuestion = userInput.includes('?')
    const isPositive = /great|nice|good|love|enjoy|wonderful/i.test(userInput)
    
    let points = 0
    let feedback = ''

    // Scoring logic
    if (length > 20 && length < 200) points += 20
    if (hasQuestion) points += 15
    if (isPositive) points += 15
    
    // Generate contextual feedback
    if (points >= 40) {
      feedback = `🌟 Excellent response! Your message is engaging and shows genuine interest. You're demonstrating great social awareness. Keep it up!`
    } else if (points >= 25) {
      feedback = `👍 Good effort! Your response is on the right track. Consider adding a question to keep the conversation flowing and show more interest in the other person.`
    } else {
      feedback = `💡 Here's a tip: Try to be more specific and engaging. Ask open-ended questions and show genuine curiosity about the other person. Your message could be more detailed.`
    }

    // Add specific scenario tips
    if (scenario.id === 1) {
      feedback += `\n\n💬 Tip: When starting a conversation, comment on something in your shared environment and follow up with an open question.`
    } else if (scenario.id === 2) {
      feedback += `\n\n💼 Tip: In professional settings, balance friendliness with professionalism. Show interest without being too casual.`
    } else if (scenario.id === 3) {
      feedback += `\n\n❤️ Tip: First dates thrive on curiosity. Ask about their interests, hobbies, or recent experiences.`
    } else if (scenario.id === 4) {
      feedback += `\n\n🛡️ Tip: Acknowledge the moment lightly and redirect. Humor can defuse tension if used appropriately.`
    }

    return { message: feedback, points }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50px',
          transition: 'all 0.3s'
        }}>
          <ArrowLeft size={20} />
          Back
        </Link>

        {selectedScenario && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} />
              Score: {score}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb size={20} />
              Attempts: {attempts}
            </div>
          </div>
        )}
      </div>

      {!selectedScenario ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            🧪 Social Lab
          </h1>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '3rem',
            textAlign: 'center',
            opacity: 0.9
          }}>
            Practice social scenarios and get AI-powered feedback
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            width: '100%'
          }}>
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario)}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  {scenario.title}
                </h3>
                <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {selectedScenario.title}
            </h2>
            <p style={{ opacity: 0.9 }}>{selectedScenario.description}</p>
            <button
              onClick={() => setSelectedScenario(null)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Change Scenario
            </button>
          </div>

          <div style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '1rem',
            overflowY: 'auto',
            maxHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  background: message.role === 'user' 
                    ? 'rgba(102, 126, 234, 0.6)' 
                    : message.role === 'assistant'
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(255, 200, 100, 0.3)',
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  whiteSpace: 'pre-line'
                }}
              >
                {message.role === 'assistant' && <Shield size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />}
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div style={{
                padding: '1rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                alignSelf: 'flex-start',
                maxWidth: '85%'
              }}>
                Analyzing your response...
              </div>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your response..."
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1rem',
                color: '#333'
              }}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                background: isLoading || !input.trim() 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(102, 126, 234, 0.8)',
                color: 'white',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 'bold'
              }}
            >
              <Send size={20} />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
