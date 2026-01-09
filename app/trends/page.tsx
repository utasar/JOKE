'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Globe, TrendingUp, MapPin } from 'lucide-react'
import Link from 'next/link'

interface TrendingJoke {
  id: number
  joke: string
  country: string
  culture: string
  category: string
  trending_score: number
}

export default function GlobalTrends() {
  const [jokes, setJokes] = useState<TrendingJoke[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedCulture, setSelectedCulture] = useState<string>('all')

  const countries = ['all', 'USA', 'UK', 'Canada', 'Australia']
  const cultures = ['all', 'Western', 'British']

  useEffect(() => {
    fetchTrends()
  }, [selectedCountry, selectedCulture])

  const fetchTrends = async () => {
    setLoading(true)
    try {
      let url = '/api/trends?limit=20'
      if (selectedCountry !== 'all') {
        url += `&country=${selectedCountry}`
      }
      if (selectedCulture !== 'all') {
        url += `&culture=${selectedCulture}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setJokes(data.jokes || [])
    } catch (error) {
      console.error('Error fetching trends:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
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
            <Globe size={40} />
            Global Trends
          </h1>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.9
          }}>
            Discover what's trending around the world
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <MapPin size={20} />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {countries.map(country => (
                <option key={country} value={country} style={{ color: '#333' }}>
                  {country === 'all' ? 'All Countries' : country}
                </option>
              ))}
            </select>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Globe size={20} />
            <select
              value={selectedCulture}
              onChange={(e) => setSelectedCulture(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {cultures.map(culture => (
                <option key={culture} value={culture} style={{ color: '#333' }}>
                  {culture === 'all' ? 'All Cultures' : culture}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            fontSize: '1.2rem'
          }}>
            Loading trending jokes...
          </div>
        ) : jokes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            fontSize: '1.2rem'
          }}>
            No jokes found for this filter
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {jokes.map((joke, index) => (
              <div
                key={joke.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s'
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
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <TrendingUp size={20} color="#FFD700" />
                    <span style={{
                      fontWeight: 'bold',
                      color: '#FFD700'
                    }}>
                      #{index + 1}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem'
                  }}>
                    {joke.trending_score}
                  </div>
                </div>

                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {joke.joke}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    background: 'rgba(102, 126, 234, 0.6)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    {joke.country}
                  </span>
                  <span style={{
                    background: 'rgba(240, 147, 251, 0.6)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    {joke.culture}
                  </span>
                  <span style={{
                    background: 'rgba(74, 222, 128, 0.6)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px'
                  }}>
                    {joke.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
