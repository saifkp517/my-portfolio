// Colors for the generic (non-brand) meta/social icons. The palette values
// mirror tailwind.config.js's `meta` tokens — duplicated here because the
// rgba-tint math in TechIcon/MetaIconTile/SocialLinks needs the raw hex at
// runtime, which a Tailwind class name can't give it.
export const META_COLORS = {
  role: '#38BDF8', // meta.sky
  stack: '#A78BFA', // meta.violet
  location: '#FB7185', // meta.rose
  time: '#FBBF24', // meta.amber
  email: '#36CE9E', // accent.500 (teal)
  phone: '#818CF8', // meta.indigo
}

export const SOCIAL_COLORS = {
  GitHub: '#F0F6FC', // GitHub's brand black fails contrast on a dark page — lightened
  LinkedIn: '#0A66C2',
  Email: '#36CE9E', // accent.500 (teal), matches the Row D email tone
}
