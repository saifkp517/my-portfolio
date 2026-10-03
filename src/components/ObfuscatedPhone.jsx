import { useEffect, useState } from 'react'

// Char codes for "+91 9148654500" — assembled client-side on mount so the
// digits never sit in the HTML/bundle as a plain, greppable string.
const CODES = [43, 57, 49, 32, 57, 49, 52, 56, 54, 53, 52, 53, 48, 48]

export default function ObfuscatedPhone({ className = '' }) {
  const [phone, setPhone] = useState(null)

  useEffect(() => {
    setPhone(String.fromCharCode(...CODES))
  }, [])

  if (!phone) {
    return (
      <span className={className} aria-hidden="true">
        · · · · · · · · · ·
      </span>
    )
  }

  return (
    <a href={`tel:${phone.replace(/\s/g, '')}`} className={className}>
      {phone}
    </a>
  )
}
