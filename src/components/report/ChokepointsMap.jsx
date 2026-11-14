// Cover for the maritime choke points project: a simplified outline map of
// the Red Sea, Gulf of Aden, Arabian Sea, Gulf of Oman and the Gulf, with the
// Strait of Hormuz and Bab el-Mandeb marked. Hand-placed coastline points
// (approximate, plate carrée), drawn in the site's tokens. No map library.

const S = 30 // px per degree
const LON0 = 30
const LAT0 = 28.6 // top edge of the frame
const W = 1200
const H = 514

const px = ([lon, lat]) => `${((lon - LON0) * S).toFixed(1)} ${((LAT0 - lat) * S).toFixed(1)}`
const poly = (pts) => `M${pts.map(px).join('L')}Z`

// Africa, west of the Red Sea, down to the Horn.
const AFRICA = [
  [28, 4], [28, 33], [32.4, 33], [32.55, 29.95], [33.0, 28.5], [33.8, 27.3], [34.3, 26.0], [35.2, 24.3],
  [35.7, 23.0], [36.9, 22.0], [37.2, 21.0], [37.3, 19.5], [38.5, 18.0], [39.3, 16.0], [39.7, 15.5],
  [41.0, 14.5], [42.0, 13.6], [43.1, 12.7], [43.3, 11.9], [44.0, 10.6], [45.0, 10.4], [46.0, 10.7],
  [47.5, 11.1], [49.0, 11.3], [50.8, 11.9], [51.2, 11.0], [51.0, 10.0], [50.0, 4],
]

// Sinai, the Arabian Peninsula and the Iranian / Makran coast as one shape.
const ASIA = [
  [32.7, 33], [32.7, 30.1], [33.2, 29.0], [34.0, 28.0], [34.3, 27.8], [34.6, 28.6], [34.9, 29.5],
  [35.2, 28.0], [36.5, 26.0], [37.5, 24.2], [38.9, 22.0], [39.2, 21.4], [40.0, 19.9], [41.0, 18.5],
  [42.0, 17.0], [42.7, 15.5], [42.9, 14.5], [43.3, 13.0], [43.5, 12.65], [44.5, 12.8], [45.0, 12.8],
  [46.5, 13.4], [48.0, 14.0], [49.5, 14.6], [51.0, 15.2], [52.2, 15.7], [53.5, 16.6], [55.0, 17.5],
  [56.3, 17.9], [57.0, 18.9], [57.8, 19.0], [58.5, 20.4], [59.4, 21.6], [59.8, 22.4], [59.0, 23.0],
  [58.3, 23.6], [57.3, 24.0], [56.4, 24.9], [56.3, 26.2], [56.1, 26.4], [55.9, 25.6], [55.4, 25.3],
  [54.5, 24.3], [53.0, 24.1], [51.6, 24.4], [51.6, 25.9], [51.2, 26.1], [50.8, 24.8], [50.2, 25.6],
  [49.8, 26.6], [49.0, 27.5], [48.5, 28.4], [48.0, 29.6], [47.9, 30.0], [48.5, 30.0], [49.5, 30.0],
  [50.3, 29.2], [51.0, 28.2], [52.5, 27.4], [54.0, 26.7], [55.5, 26.6], [56.3, 27.1], [57.0, 26.0],
  [57.3, 25.6], [58.5, 25.6], [60.0, 25.4], [61.6, 25.1], [63.5, 25.2], [65.0, 25.3], [66.6, 25.4],
  [67.2, 24.8], [68.0, 23.8], [72, 23.5], [72, 33],
]

const SOCOTRA = [[53.3, 12.7], [54.5, 12.6], [54.2, 12.3], [53.4, 12.4]]

const SEAS = [
  { name: 'Red Sea', at: [37.6, 20.6] },
  { name: 'Gulf of Aden', at: [46.6, 12.15] },
  { name: 'Arabian Sea', at: [61.5, 17.5] },
  { name: 'Gulf of Oman', at: [60.2, 24.1] },
  { name: 'The Gulf', at: [51.6, 27.05] },
]

const CHOKEPOINTS = [
  { name: 'Strait of Hormuz', at: [56.35, 26.55], label: [55.6, 27.9], anchor: 'end' },
  { name: 'Bab el-Mandeb', at: [43.4, 12.6], label: [39.2, 13.1], anchor: 'end' },
]

const xy = (p) => px(p).split(' ').map(Number)

export default function ChokepointsMap({ className = 'relative aspect-[21/9]' }) {
  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Simplified map of the area of study: the Red Sea, Gulf of Aden, Arabian Sea, Gulf of Oman and the Gulf around the Arabian Peninsula, with the Strait of Hormuz and Bab el-Mandeb choke points marked."
        style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
      >
        <defs>
          <pattern id="map-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>

        {/* sea: dot grid + graticule every 5° */}
        <rect width={W} height={H} fill="url(#map-dots)" />
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          {[35, 40, 45, 50, 55, 60, 65].map((lon) => {
            const [x] = xy([lon, 0])
            return <line key={lon} x1={x} y1="0" x2={x} y2={H} />
          })}
          {[15, 20, 25].map((lat) => {
            const [, y] = xy([0, lat])
            return <line key={lat} x1="0" y1={y} x2={W} y2={y} />
          })}
        </g>

        {/* land */}
        <g fill="#111317" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeLinejoin="round">
          <path d={poly(AFRICA)} />
          <path d={poly(ASIA)} />
          <path d={poly(SOCOTRA)} />
        </g>

        <text {...pos([45.5, 21.5])} fill="rgba(255,255,255,0.3)" fontSize="15" letterSpacing="3" textAnchor="middle">
          ARABIAN PENINSULA
        </text>

        {SEAS.map((s) => (
          <text key={s.name} {...pos(s.at)} fill="rgba(56,189,248,0.6)" fontSize="13" fontStyle="italic" textAnchor="middle">
            {s.name}
          </text>
        ))}

        {CHOKEPOINTS.map((c) => {
          const [x, y] = xy(c.at)
          const [lx, ly] = xy(c.label)
          return (
            <g key={c.name}>
              <line x1={x} y1={y} x2={lx} y2={ly - 5} stroke="rgba(54,206,158,0.5)" strokeWidth="1" />
              <circle cx={x} cy={y} r="14" fill="none" stroke="#36CE9E" strokeOpacity="0.5" className="motion-reduce:hidden">
                <animate attributeName="r" values="6;20" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.7;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="5" fill="#36CE9E" />
              <text x={lx} y={ly} fill="#36CE9E" fontSize="15" fontWeight="600" textAnchor={c.anchor}>
                {c.name}
              </text>
            </g>
          )
        })}

        <text x="110" y="52" fill="rgba(255,255,255,0.4)" fontSize="13" letterSpacing="2">
          AREA OF STUDY
        </text>
        <text x={W - 110} y={H - 28} fill="rgba(255,255,255,0.3)" fontSize="11" textAnchor="end">
          Simplified outline · approximate
        </text>
      </svg>
    </div>
  )
}

function pos(p) {
  const [x, y] = xy(p)
  return { x, y }
}
