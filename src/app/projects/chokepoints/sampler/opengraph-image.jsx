import { ImageResponse } from 'next/og'
import { NODE_H, NODE_W, PIPELINE_LABEL, pipelineLayout } from '../../../../data/samplerPipeline.js'

// Link-preview PNG for the sampler article, rendered by Next at build time.
// Same pipeline as the on-page cover (src/components/report/SamplerPipelineCover.jsx),
// laid out for 1200×630 with flexbox nodes and an SVG for the connectors.

export const alt = PIPELINE_LABEL
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TEAL = '#36ce9e'

export default function Image() {
  const { nodes, edges } = pipelineLayout(1200, 170, 96)
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#080b0c', color: '#fff', fontFamily: 'monospace', border: '2px solid #24483f' }}>
      <div style={{ position: 'absolute', left: 60, top: 56, display: 'flex', color: TEAL, fontSize: 20, letterSpacing: 4 }}>SAIFULLAH KHAN / NEWS SAMPLER</div>
      <div style={{ position: 'absolute', right: 60, top: 50, display: 'flex', color: TEAL, fontSize: 18, padding: '6px 14px', border: `1px solid ${TEAL}88`, borderRadius: 4 }}>runs locally · no LLM calls</div>

      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
        {edges.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        ))}
      </svg>

      {nodes.map((n) => (
        <div
          key={n.title}
          style={{
            position: 'absolute',
            left: n.x,
            top: n.y,
            width: NODE_W,
            height: NODE_H,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 18px',
            background: '#111317',
            border: `1.5px solid ${n.kind ? TEAL + '99' : 'rgba(255,255,255,0.14)'}`,
            borderRadius: n.kind ? '34px 4px 4px 34px' : 4,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${n.color}1f`, border: `1px solid ${n.color}40`, borderRadius: 3, marginRight: 12 }}>
              <svg width="22" height="22" viewBox="0 0 16 16">
                <path d={n.icon} fill="none" stroke={n.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ display: 'flex', fontSize: 19, fontWeight: 700 }}>{n.title}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, fontSize: 15, color: '#9aa5a1' }}>
            {n.sub.map((l) => (
              <div key={l} style={{ display: 'flex' }}>{l}</div>
            ))}
          </div>
        </div>
      ))}

      {/* ports drawn last so they sit on top of node borders */}
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
        {nodes.flatMap((n) => [n.inPort, n.outPort].filter(Boolean)).map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r="5" fill="#080b0c" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        ))}
      </svg>
    </div>,
    size,
  )
}
