import MetaIconTile from './frame/MetaIconTile.jsx'

// One cell of the hero-style meta grid: tinted icon tile, then mono text. An
// optional `label` turns it into a Notion-style property row.
export default function MetaRow({ icon, color, label, children, rightBorder }) {
  return (
    <div
      className={`flex items-center gap-2.5 border-b border-line px-5 py-3 sm:px-6 ${
        rightBorder ? 'sm:border-r' : ''
      }`}
    >
      <MetaIconTile color={color}>{icon}</MetaIconTile>
      {label && <span className="w-28 shrink-0 font-mono text-xs text-white/45">{label}</span>}
      <span className="min-w-0 truncate font-mono text-sm text-white/75">{children}</span>
    </div>
  )
}
