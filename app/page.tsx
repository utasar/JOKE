'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Smile, Brain, TrendingUp, Sparkles } from 'lucide-react'

export default function Home() {
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
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🎭 JOKE Entertainment Hub
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        marginBottom: '3rem',
        textAlign: 'center',
        maxWidth: '600px',
        opacity: 0.9
      }}>
        Your AI-powered platform for entertainment, social confidence, and global humor
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <Link href="/swipe">
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <Smile size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Entertainment Swipe</h2>
            <p style={{ opacity: 0.8 }}>Discover jokes, memes, and social lines with a fun swipe interface</p>
          </div>
        </Link>

        <Link href="/social-lab">
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <Brain size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Social Lab</h2>
            <p style={{ opacity: 0.8 }}>Practice social scenarios with AI feedback and track your progress</p>
          </div>
        </Link>

        <Link href="/trends">
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <TrendingUp size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Global Trends</h2>
            <p style={{ opacity: 0.8 }}>Explore trending jokes from around the world by country and culture</p>
          </div>
        </Link>

        <Link href="/ai-reply">
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <Sparkles size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Reply Pro</h2>
            <p style={{ opacity: 0.8 }}>Generate funny, witty, and charming responses with AI assistance</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
