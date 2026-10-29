import { ImageResponse } from 'next/og'

export const alt = 'From handwritten notebooks to a 20-minute weekly audit'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#080b0c', color: '#fff', padding: '70px 80px', fontFamily: 'monospace', border: '2px solid #24483f' }}>
      <div style={{ display: 'flex', color: '#36ce9e', fontSize: 20, letterSpacing: 4 }}>SAIFULLAH KHAN / CASE STUDY</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 53, fontWeight: 700, lineHeight: 1.18, maxWidth: 950 }}>From handwritten notebooks to a 20-minute weekly audit.</div>
        <div style={{ display: 'flex', marginTop: 30, fontSize: 25, color: '#b5c2bd' }}>Custom ERP for a concrete block manufacturer</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 38, color: '#36ce9e' }}><span style={{ color: '#adbab5' }}>4–6 hrs</span><span>→</span><span>~20 min</span><span style={{ color: '#adbab5', fontSize: 20 }}>every weekend</span></div>
    </div>, size,
  )
}
