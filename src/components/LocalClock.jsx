import { useEffect, useState } from 'react'

const TIME_ZONE = 'Asia/Kolkata'
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

export default function LocalClock() {
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 30_000)
    return () => clearInterval(id)
  }, [])

  return <span>{time} // IST</span>
}
