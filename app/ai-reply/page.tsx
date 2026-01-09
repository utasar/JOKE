'use client'

import { useState } from 'react'
import { ArrowLeft, Sparkles, Send } from 'lucide-react'
import Link from 'next/link'

type StyleType = 'funny' | 'witty' | 'charming'

export default function AIReplyPro() {
  const [context, setContext] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('funny')
  const [reply, setReply] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const styles: { value: StyleType; label: string; description: string; emoji: string }[] = [
    { value: 'funny', label: 'Funny', description: 'Lighthearted and humorous', emoji: '😄' },
    { value: 'witty', label: 'Witty', description: 'Clever and intelligent', emoji: '🧠' },
    { value: 'charming', label: 'Charming', description: 'Gracious and warm', emoji: '✨' },
  ]

  const handleGenerate = async () => {
    if (!context.trim()) {
      setError('Please enter a context or situation')
      return
    }

    setIsLoading(true)
    setError('')
    setReply('')

    try {
      const response = await fetch('/api/ai-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context,
          style: selectedStyle,
          safetyCheck: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate reply')
      }

      if (!data.safe) {
        setError('Content safety check failed. Please try a different context.')
        return
      }

      setReply(data.reply)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          marginBottom: '2rem'
        }}>
          <Link href="/" style={{
            display: 'inline-flex',
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
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <Sparkles size={40} />
            AI Reply Pro
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9
          }}>
            Generate perfect responses with AI-powered social intelligence
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '1rem',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}>
            Describe the situation or context:
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., I'm at a party and someone just complimented my outfit..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1rem',
              color: '#333',
              resize: 'vertical'
            }}
          />

          <div style={{
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              Choose your style:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {styles.map((style) => (
                <div
                  key={style.value}
                  onClick={() => setSelectedStyle(style.value)}
                  style={{
                    padding: '1rem',
                    borderRadius: '10px',
                    border: `2px solid ${selectedStyle === style.value ? '#fff' : 'rgba(255, 255, 255, 0.3)'}`,
                    background: selectedStyle === style.value 
                      ? 'rgba(255, 255, 255, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStyle !== style.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStyle !== style.value) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {style.emoji}
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {style.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    {style.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !context.trim()}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              border: 'none',
              background: isLoading || !context.trim() 
                ? 'rgba(255, 255, 255, 0.3)' 
                : 'rgba(102, 126, 234, 0.8)',
              color: 'white',
              cursor: isLoading || !context.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s'
            }}
          >
            {isLoading ? (
              <>Generating...</>
            ) : (
              <>
                <Send size={20} />
                Generate Reply
              </>
            )}
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 100, 100, 0.3)',
            border: '1px solid rgba(255, 100, 100, 0.5)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {reply && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#333',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: '#667eea',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              <Sparkles size={20} />
              Your AI-Generated Reply:
            </div>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              margin: 0
            }}>
              {reply}
            </p>
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '10px',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              💡 <strong>Tip:</strong> Feel free to adapt this response to match your personal style and the specific situation.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
