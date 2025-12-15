import { array, number, object, parse, string } from 'valibot'

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  audio: {
    src: string
    type: string
  }
}

export async function getAllEpisodes() {
  let FeedSchema = object({
    items: array(
      object({
        id: number(),
        title: string(),
        published: number(),
        description: string(),
        content: string(),
        enclosures: array(
          object({
            url: string(),
            type: string(),
          }),
        ),
      }),
    ),
  })

  // Use local API route to avoid CORS issues in browser
  const response = await fetch('/api/feed')
  if (!response.ok) {
    throw new Error('Failed to fetch feed')
  }
  let feed = await response.json()
  let items = parse(FeedSchema, feed).items

  let episodes: Array<Episode> = items.map(
    ({ id, title, description, content, enclosures, published }) => ({
      id,
      title: `${id}: ${title}`,
      published: new Date(published),
      description,
      content,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return episodes
}
