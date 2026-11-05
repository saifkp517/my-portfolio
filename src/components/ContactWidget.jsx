'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { openContact } from '../lib/openContact.js'

// The sheet is only fetched the first time someone opens it, so it costs
// nothing on first load.
const ContactDialog = dynamic(() => import('./ContactDialog.jsx'), { ssr: false })

// Floating "Say hi" button + the contact sheet it opens. Other buttons open
// the same sheet via openContact().
export default function ContactWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('open-contact', show)
    return () => window.removeEventListener('open-contact', show)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={openContact}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex min-h-[44px] items-center rounded-md border border-accent-500/40 bg-ink/90 px-4 font-mono text-xs font-semibold text-accent-400 backdrop-blur-md transition-colors hover:bg-accent-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none"
      >
        Say hi 👋
      </button>
      {open && <ContactDialog onClose={() => setOpen(false)} />}
    </>
  )
}
