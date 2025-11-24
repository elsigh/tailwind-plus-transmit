'use client'

import { useEffect, useState } from 'react'

export function DelayedSidebar({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Simulate a slow-loading sidebar that causes dramatic CLS
    const timer = setTimeout(() => {
      setShow(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <header
      className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:items-start lg:overflow-y-auto xl:w-120"
      style={{
        width: show ? 'auto' : '0',
        transition: 'none',
      }}
    >
      {children}
    </header>
  )
}
