import { NODE_W, PIPELINE_LABEL, nodeShape, pipelineLayout } from '../../data/samplerPipeline.js'

// Cover for the sampler article: the pipeline drawn as a node-editor workflow
// (node cards, ports, bezier connectors) on a dot-grid canvas. Inline SVG in
// the site's tokens, 21:9 like the other report covers. A teal dot travels
// each connector in turn; it is hidden for reduced motion and the still frame
// is complete without it.

const W = 1200
const H = 514
const INK = '#08090b'
const PANEL = '#111317'
const LINE = 'rgba(255,255,255,0.12)'
const TEAL = '#36CE9E'

const { nodes, edges } = pipelineLayout(W, 110, 86)

function Node({ n }) {
  const io = Boolean(n.kind)
  return (
    <g>
      <path d={nodeShape(n)} fill={PANEL} stroke={io ? `${TEAL}99` : LINE} strokeWidth={io ? 1.5 : 1} />
      {/* icon tile, same tint recipe as MetaIconTile */}
      <rect x={n.x + 18} y={n.y + 18} width="36" height="36" rx="3" fill={`${n.color}1f`} stroke={`${n.color}40`} />
      <path
        d={n.icon}
        transform={`translate(${n.x + 24} ${n.y + 24}) scale(1.5)`}
        fill="none"
        stroke={n.color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={n.x + 66} y={n.y + 43} fill="#fff" fontSize="18" fontWeight="600">
        {n.title}
      </text>
      {n.sub.map((line, k) => (
        <text key={k} x={n.x + 20} y={n.y + 82 + k * 20} fill="rgba(255,255,255,0.55)" fontSize="14">
          {line}
        </text>
      ))}
      {io && (
        <text
          x={n.x + NODE_W - 14}
          y={n.y + 22}
          textAnchor="end"
          fill={TEAL}
          fontSize="10"
          letterSpacing="1.5"
        >
          {n.kind.toUpperCase()}
        </text>
      )}
      {[n.inPort, n.outPort].filter(Boolean).map(([px, py], k) => (
        <circle key={k} cx={px} cy={py} r="5" fill={INK} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      ))}
    </g>
  )
}

export default function SamplerPipelineCover() {
  const cycle = edges.length // seconds, one per connector
  return (
    <div className="relative aspect-[21/9] overflow-hidden bg-ink">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={PIPELINE_LABEL}
        style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontVariantLigatures: 'none' }}
      >
        <defs>
          <pattern id="sampler-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.09)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#sampler-dots)" />

        {/* corner tag */}
        <g>
          <rect x={W - 60 - 262} y="44" width="262" height="30" rx="3" fill={`${TEAL}14`} stroke={`${TEAL}55`} />
          <text x={W - 60 - 131} y="64" textAnchor="middle" fill={TEAL} fontSize="13">
            runs locally · no LLM calls
          </text>
        </g>
        <text x="60" y="64" fill="rgba(255,255,255,0.4)" fontSize="13" letterSpacing="2">
          NEWS SAMPLER · WORKFLOW
        </text>

        {edges.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        ))}

        {nodes.map((n) => (
          <Node key={n.title} n={n} />
        ))}

        {/* travelling dots: each connector lights up in turn */}
        <g className="motion-reduce:hidden">
          {edges.map((d, i) => {
            const a = (i / cycle).toFixed(4)
            const b = ((i + 1) / cycle).toFixed(4)
            return (
              <circle key={i} r="4.5" fill={TEAL} opacity="0">
                <animateMotion
                  path={d}
                  dur={`${cycle}s`}
                  repeatCount="indefinite"
                  keyPoints="0;0;1;1"
                  keyTimes={`0;${a};${b};1`}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur={`${cycle}s`}
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                  keyTimes={`0;${a};${b};${Math.min(1, +b + 0.0001).toFixed(4)};1`}
                  calcMode="discrete"
                />
              </circle>
            )
          })}
        </g>
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-ink"
      />
    </div>
  )
}
