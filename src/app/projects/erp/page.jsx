import ErpProject from '../../../views/projects/ErpProject.jsx'

const title = 'From handwritten notebooks to a 20-minute weekly audit'
const description = 'How a custom ERP helped a concrete block manufacturer replace a 4–6 hour weekend audit with a 20-minute review and live dashboards.'

export const metadata = {
  title,
  description,
  alternates: { canonical: 'https://saif-khan5017.vercel.app/projects/erp' },
  openGraph: { type: 'article', url: 'https://saif-khan5017.vercel.app/projects/erp', title, description, images: [{ url: 'https://saif-khan5017.vercel.app/projects/erp/opengraph-image', width: 1200, height: 630, alt: 'From handwritten notebooks to a 20-minute weekly audit' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['https://saif-khan5017.vercel.app/projects/erp/opengraph-image'] },
}

export default function Page() {
  return <ErpProject />
}
