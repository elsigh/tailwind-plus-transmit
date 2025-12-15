'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { type Episode, getAllEpisodes } from '@/lib/episodes'

// ONE MASSIVE CLS - 100vh tall block appears and pushes ALL content down
function MassiveCLSBlock() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // 600ms - content is painted, then BAM - push it all down by 100vh
    const timer = setTimeout(() => setShow(true), 600)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  // Force 100vh height to guarantee maximum CLS
  return (
    <div style={{ minHeight: '100vh' }} className="bg-gradient-to-b from-red-600 via-purple-600 to-blue-600 flex flex-col items-center justify-center text-white text-center p-8">
      <h2 className="text-5xl font-bold mb-6">🔥 MEGA ANNOUNCEMENT 🔥</h2>
      <p className="text-2xl mb-4">The biggest podcast event of the year is here!</p>
      <p className="text-xl mb-4">Subscribe now and get 50% off your first year!</p>
      <p className="text-lg mb-6">Don't miss out on this incredible limited-time opportunity!</p>
      <button className="bg-yellow-400 text-gray-900 px-10 py-5 rounded-full font-bold text-2xl mb-8">CLAIM YOUR DEAL NOW</button>

      <div className="mt-8 p-6 bg-white/10 rounded-xl max-w-md">
        <h3 className="text-2xl font-bold mb-4">📬 Never Miss an Episode!</h3>
        <p className="mb-4">Join 50,000+ listeners who get exclusive content.</p>
        <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg text-gray-900 mb-3" />
        <button className="w-full bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-bold">Subscribe Free</button>
      </div>
    </div>
  )
}

function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`}>{episode.title}</Link>
          </h2>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm/7 text-slate-500"
          />
          <p className="mt-1 text-base/7 text-slate-700">
            {episode.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

function DelayedBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Simulate a slow-loading banner/ad that causes CLS
    const timer = setTimeout(() => {
      setShow(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-8 px-6">
      <Container>
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">
            🎉 Special Announcement!
          </h2>
          <p className="text-lg">
            Subscribe now to get exclusive content and early access to new episodes!
          </p>
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  const [episodes, setEpisodes] = useState<Episode[]>([])

  useEffect(() => {
    getAllEpisodes().then(setEpisodes)
  }, [])

  return (
    <div className="pb-12 sm:pb-4">
      <div className="pt-16 lg:pt-12">
        <Container>
          <h1 className="text-2xl/7 font-bold text-slate-900">Episodes</h1>
        </Container>

        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </div>
  )
}
