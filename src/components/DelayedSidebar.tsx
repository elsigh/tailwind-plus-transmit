'use client'

export function DelayedSidebar({ children }: { children: React.ReactNode }) {
  // Show immediately - no delay. The LayoutCLSBlock will cause the ONE big shift.
  return (
    <header className="bg-slate-50 lg:inset-y-0 lg:left-0 lg:flex lg:items-start lg:overflow-y-auto xl:w-120">
      {children}
    </header>
  )
}
