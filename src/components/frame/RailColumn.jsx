// The page's single narrow column: hairline rails on the left/right edges.
// Nav and the scrolling page body each render their own RailColumn (Nav is
// `fixed`, so it can't share a literal DOM ancestor with the body), but
// since both are centered at the same max-width, their rails line up into
// what reads as one continuous pair of verticals down the page.
export default function RailColumn({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`mx-auto max-w-2xl border-x border-line ${className}`}>{children}</Tag>
  )
}
