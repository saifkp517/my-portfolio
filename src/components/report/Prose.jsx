// Small building blocks for long-form articles, styled to match ReportSection:
// hairline borders, mono labels, white-at-opacity text.

export function Code({ children }) {
  return (
    <code className="rounded-sm border border-line bg-white/[0.03] px-1 py-px font-mono text-[13px] text-white/85">
      {children}
    </code>
  )
}

export const B = ({ children }) => <strong className="font-medium text-white/90">{children}</strong>

export function H3({ children }) {
  return <h3 className="pt-4 font-mono text-[15px] font-semibold tracking-tight text-white/90">{children}</h3>
}

export function List({ children }) {
  return <ul className="list-disc space-y-1.5 pl-5 marker:text-white/30">{children}</ul>
}

export function OrderedList({ children }) {
  return <ol className="list-decimal space-y-1.5 pl-5 marker:font-mono marker:text-xs marker:text-white/40">{children}</ol>
}

// Blockquote / callout: a teal rule on the left, optional mono label.
export function Callout({ children }) {
  return (
    <blockquote className="space-y-2 border-l-2 border-accent-500/60 bg-white/[0.02] px-4 py-3 text-white/75">
      {children}
    </blockquote>
  )
}

// Minimal Python highlighter, no dependency. Colours come from the site's
// meta palette (tailwind.config.js). One regex walks the code; each match
// group is a token type, everything between matches stays plain.
const PY_TOKEN = new RegExp(
  [
    '(#[^\\n]*)', // 1 comment
    '("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')', // 2 string
    '\\b(def|return|for|in|if|else|elif|continue|break|import|from|as|while|not|and|or|is|None|True|False|class|with|lambda)\\b', // 3 keyword
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 4 number
    '\\b([A-Za-z_]\\w*)(?=\\()', // 5 function call / definition
  ].join('|'),
  'g',
)
const PY_CLASS = [null, 'text-white/40 italic', 'text-meta-amber', 'text-meta-violet', 'text-meta-rose', 'text-meta-sky']

function highlightPython(code) {
  const out = []
  let last = 0
  for (const m of code.matchAll(PY_TOKEN)) {
    if (m.index > last) out.push(code.slice(last, m.index))
    const group = m.findIndex((g, i) => i > 0 && g !== undefined)
    out.push(
      <span key={m.index} className={PY_CLASS[group]}>
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  out.push(code.slice(last))
  return out
}

// Code block. `language` is shown as a label; plain text when omitted.
// Python is syntax-highlighted. Scrolls sideways on narrow screens instead
// of widening the page.
export function CodeBlock({ language, children }) {
  const code = children.replace(/^\n/, '').replace(/\n\s*$/, '')
  return (
    <figure className="border border-line bg-panel">
      <figcaption className="border-b border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/45">
        {language ?? 'Text'}
      </figcaption>
      <pre
        tabIndex={0}
        aria-label={language ? `${language} code` : 'Text output'}
        // Show operators as typed (!=, >=), not as font ligatures (≠, ≥).
        style={{ fontVariantLigatures: 'none' }}
        className="thin-scrollbar overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
      >
        <code>{language === 'Python' ? highlightPython(code) : code}</code>
      </pre>
    </figure>
  )
}
