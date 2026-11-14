import ChokepointsSampler from '../../../../views/projects/ChokepointsSampler.jsx'

const title = 'How the sampler clusters 10k+ news headlines'
const description = 'Embed, dedupe, cluster, split, rank, pick representatives and write a report, on a laptop CPU with no LLM calls.'
const url = 'https://saif-khan5017.vercel.app/projects/chokepoints/sampler'
const image = `${url}/opengraph-image`

export const metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'article', url, title, description, images: [{ url: image, width: 1200, height: 630, alt: 'The sampler pipeline drawn as a node workflow' }] },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
}

export default function Page() {
  return <ChokepointsSampler />
}
