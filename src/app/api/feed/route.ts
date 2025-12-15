import { parse as parseFeed } from 'rss-to-json'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const feed = await parseFeed('https://their-side-feed.vercel.app/api/feed')
    return NextResponse.json(feed)
  } catch (error) {
    console.error('Error fetching feed:', error)
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 })
  }
}
