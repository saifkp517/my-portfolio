// The sampler's pipeline as drawn on the article cover and its link-preview
// image. One source of truth for node text, icons and the snake layout.
import { META_COLORS } from './iconColors.js'

const TEAL = META_COLORS.email // accent.500

// `sub` is pre-split into lines so the text fits the node at thumbnail size.
export const PIPELINE_NODES = [
  { title: 'Headlines', sub: ['input (CSV of news', 'headlines)'], kind: 'input', color: TEAL, icon: 'M4 2.5h8v11H4zM6 5.5h4M6 8h4M6 10.5h2.5' },
  { title: 'Embed', sub: ['all-MiniLM-L6-v2,', '384-d vectors'], color: META_COLORS.role, icon: 'M3 13V9M8 13V3M13 13V6' },
  { title: 'Dedupe', sub: ['cosine ≥ 0.9,', 'leader clustering'], color: META_COLORS.stack, icon: 'M3 3h7v7H3zM6 6h7v7H6z' },
  { title: 'Cluster', sub: ['UMAP → HDBSCAN'], color: META_COLORS.phone, icon: 'M3 5.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0M9 5a2 2 0 1 0 4 0a2 2 0 1 0-4 0M6 11.5a2 2 0 1 0 4 0a2 2 0 1 0-4 0' },
  { title: 'Split', sub: ['coherence < 0.65 →', 'split in two'], color: META_COLORS.location, icon: 'M8 13.5V8M8 8L4 2.5M8 8l4-5.5' },
  { title: 'Rank', sub: ['sources · size ·', 'velocity · coherence'], color: META_COLORS.time, icon: 'M3 4h10M3 8h7M3 12h4' },
  { title: 'Representatives', sub: ['top 20 topics ×', '5 headlines'], color: META_COLORS.role, icon: 'M8 2.5l1.7 3.5 3.8.5-2.8 2.6.7 3.8L8 11.1l-3.4 1.8.7-3.8-2.8-2.6 3.8-.5z' },
  { title: 'report.md', sub: ['output'], kind: 'output', color: TEAL, icon: 'M4 2.5h5.5l3 3v8H4zM9.5 2.5v3h3' },
]

export const PIPELINE_LABEL =
  'Sampler pipeline, in order: Headlines (input), Embed, Dedupe, Cluster, Split, Rank, Representatives, report.md (output). Runs locally, no LLM calls.'

// Snake layout: the first four nodes run left to right on the top row, the
// last four run right to left on the bottom row.
export const NODE_W = 240
export const NODE_H = 124
const STEP = 280

export function pipelineLayout(width, top, rowGap) {
  const left = (width - (3 * STEP + NODE_W)) / 2
  const nodes = PIPELINE_NODES.map((n, i) => {
    const row = i < 4 ? 0 : 1
    const col = row === 0 ? i : 7 - i
    const x = left + col * STEP
    const y = top + row * (NODE_H + rowGap)
    const mid = y + NODE_H / 2
    // Top row flows right, bottom row flows left.
    const inPort = n.kind === 'input' ? null : row === 0 ? [x, mid] : [x + NODE_W, mid]
    const outPort = n.kind === 'output' ? null : row === 0 ? [x + NODE_W, mid] : [x, mid]
    return { ...n, x, y, inPort, outPort }
  })
  const edges = nodes.slice(0, -1).map((n, i) => {
    const [x1, y1] = n.outPort
    const [x2, y2] = nodes[i + 1].inPort
    if (y1 === y2) {
      const d = (x2 - x1) / 2
      return `M${x1} ${y1}C${x1 + d} ${y1} ${x2 - d} ${y2} ${x2} ${y2}`
    }
    // The wrap between rows bows out past the right edge of the top row.
    return `M${x1} ${y1}C${x1 + 44} ${y1} ${x2 + 44} ${y2} ${x2} ${y2}`
  })
  return { nodes, edges }
}

// Input/output nodes get n8n's "trigger" shape: fully rounded on the outer
// (left) side, near-square elsewhere. Matches the site's rounded-sm radius.
export function nodeShape({ x, y, kind }) {
  const r = 4
  const R = kind ? 34 : r
  return `M${x + R} ${y}H${x + NODE_W - r}Q${x + NODE_W} ${y} ${x + NODE_W} ${y + r}V${y + NODE_H - r}Q${x + NODE_W} ${y + NODE_H} ${x + NODE_W - r} ${y + NODE_H}H${x + R}Q${x} ${y + NODE_H} ${x} ${y + NODE_H - R}V${y + R}Q${x} ${y} ${x + R} ${y}Z`
}
