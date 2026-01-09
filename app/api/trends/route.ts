import { NextResponse } from 'next/server'

interface TrendingJoke {
  id: number
  joke: string
  country: string
  culture: string
  category: string
  trending_score: number
}

// Sample data - in production this would come from a database
const trendingJokes: TrendingJoke[] = [
  { id: 1, joke: "Why don't programmers like nature? It has too many bugs.", country: 'USA', culture: 'Western', category: 'Tech', trending_score: 95 },
  { id: 2, joke: "I told my wife she was drawing her eyebrows too high. She looked surprised.", country: 'UK', culture: 'British', category: 'Observational', trending_score: 92 },
  { id: 3, joke: "Why did the coffee file a police report? It got mugged.", country: 'USA', culture: 'Western', category: 'Puns', trending_score: 88 },
  { id: 4, joke: "What do you call a fish wearing a crown? A king fish!", country: 'Australia', culture: 'Western', category: 'Puns', trending_score: 85 },
  { id: 5, joke: "Why don't eggs tell jokes? They'd crack each other up.", country: 'Canada', culture: 'Western', category: 'Food', trending_score: 82 },
  { id: 6, joke: "What did the ocean say to the beach? Nothing, it just waved.", country: 'USA', culture: 'Western', category: 'Classic', trending_score: 80 },
  { id: 7, joke: "Why did the bicycle fall over? It was two-tired.", country: 'UK', culture: 'British', category: 'Puns', trending_score: 78 },
  { id: 8, joke: "What do you call a bear in the rain? A drizzly bear.", country: 'Canada', culture: 'Western', category: 'Animal', trending_score: 75 },
  { id: 9, joke: "Why don't scientists trust stairs? They're always up to something.", country: 'USA', culture: 'Western', category: 'Science', trending_score: 73 },
  { id: 10, joke: "What's orange and sounds like a parrot? A carrot.", country: 'Australia', culture: 'Western', category: 'Wordplay', trending_score: 70 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const culture = searchParams.get('culture')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filteredJokes = [...trendingJokes]

  if (country) {
    filteredJokes = filteredJokes.filter(joke => 
      joke.country.toLowerCase() === country.toLowerCase()
    )
  }

  if (culture) {
    filteredJokes = filteredJokes.filter(joke => 
      joke.culture.toLowerCase() === culture.toLowerCase()
    )
  }

  // Sort by trending score
  filteredJokes.sort((a, b) => b.trending_score - a.trending_score)

  // Limit results
  filteredJokes = filteredJokes.slice(0, limit)

  return NextResponse.json({
    success: true,
    count: filteredJokes.length,
    jokes: filteredJokes
  })
}
