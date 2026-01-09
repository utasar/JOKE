'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ArrowLeft, Heart, X, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface ContentItem {
  id: number
  type: 'joke' | 'meme' | 'line'
  content: string
  category?: string
}

const sampleContent: ContentItem[] = [
  { id: 1, type: 'joke', content: "Why don't scientists trust atoms? Because they make up everything!", category: 'Science' },
  { id: 2, type: 'line', content: "I'm not a photographer, but I can picture us together.", category: 'Charming' },
  { id: 3, type: 'joke', content: "What do you call a bear with no teeth? A gummy bear!", category: 'Puns' },
  { id: 4, type: 'line', content: "Are you a magician? Because whenever I look at you, everyone else disappears.", category: 'Witty' },
  { id: 5, type: 'joke', content: "Why did the scarecrow win an award? He was outstanding in his field!", category: 'Classic' },
  { id: 6, type: 'line', content: "Do you have a name, or can I call you mine?", category: 'Funny' },
  { id: 7, type: 'joke', content: "What do you call fake spaghetti? An impasta!", category: 'Food' },
  { id: 8, type: 'line', content: "If you were a vegetable, you'd be a cute-cumber!", category: 'Playful' },
]

export default function EntertainmentSwipe() {
  const [cards, setCards] = useState<ContentItem[]>(sampleContent)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<ContentItem[]>([])
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)

  const currentCard = cards[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    setExitDirection(direction)
    if (direction === 'right') {
      setLiked([...liked, currentCard])
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setExitDirection(null)
    }, 300)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      handleSwipe('right')
    } else if (info.offset.x < -threshold) {
      handleSwipe('left')
    }
  }

  if (currentIndex >= cards.length) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: 'white'
      }}>
        <Link href="/" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
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
        
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 All Done!</h2>
        <p style={{ marginBottom: '2rem' }}>You've seen all the content. You liked {liked.length} items!</p>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setLiked([])
          }}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Start Over
        </button>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white',
      position: 'relative'
    }}>
      <Link href="/" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
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

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50px'
      }}>
        <Heart size={20} fill="white" />
        <span>{liked.length}</span>
      </div>

      <h1 style={{
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Swipe for Entertainment
      </h1>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        height: '500px',
        marginBottom: '2rem'
      }}>
        <AnimatePresence>
          {currentCard && (
            <motion.div
              key={currentCard.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: exitDirection === 'right' ? 20 : exitDirection === 'left' ? -20 : 0,
                x: exitDirection === 'right' ? 300 : exitDirection === 'left' ? -300 : 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.8
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                color: '#333'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: currentCard.type === 'joke' ? '#667eea' : '#f093fb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {currentCard.type.toUpperCase()}
              </div>

              {currentCard.category && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(102, 126, 234, 0.2)',
                  color: '#667eea',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {currentCard.category}
                </div>
              )}

              <Sparkles size={48} color="#667eea" style={{ marginBottom: '2rem' }} />
              
              <p style={{
                fontSize: '1.5rem',
                textAlign: 'center',
                lineHeight: '1.6',
                color: '#333'
              }}>
                {currentCard.content}
              </p>

              <div style={{
                position: 'absolute',
                bottom: '1rem',
                fontSize: '0.9rem',
                color: '#999'
              }}>
                {currentIndex + 1} / {cards.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <button
          onClick={() => handleSwipe('left')}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.5)',
            background: 'rgba(255, 100, 100, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <X size={32} color="white" />
        </button>

        <button
          onClick={() => handleSwipe('right')}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.5)',
            background: 'rgba(100, 255, 100, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <Heart size={32} color="white" fill="white" />
        </button>
      </div>

      <p style={{
        marginTop: '2rem',
        opacity: 0.8,
        fontSize: '0.9rem'
      }}>
        Swipe right to like, left to pass
      </p>
    </div>
  )
}
