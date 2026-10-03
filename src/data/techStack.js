// Full stack table shown in the homepage "Stack" section, grouped the way a
// spec sheet would group them. CORE_STACK (coreStack.js) is the short list
// named in the hero bio; this is the complete set.
//
// `color` is each technology's official brand color (so the icon renders in
// its real identity, not a generic tint). Next.js's brand mark is pure black
// and WebSockets has no official logo/color at all — both are lightened to
// near-white/a palette tone so they stay visible on the dark background.
export const STACK_CATEGORIES = [
  {
    label: '01 Language',
    items: [{ name: 'TypeScript', slug: 'typescript', color: '#3178C6' }],
  },
  {
    label: '02 Frontend',
    items: [{ name: 'Next.js', slug: 'nextdotjs', color: '#F5F5F5' }],
  },
  {
    label: '03 Backend',
    items: [
      { name: 'NestJS', slug: 'nestjs', color: '#E0234E' },
      { name: 'WebSockets', slug: null, color: '#818CF8' },
    ],
  },
  {
    label: '04 Database',
    items: [
      { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
      { name: 'Redis', slug: 'redis', color: '#FF4438' },
      { name: 'TypeORM', slug: 'typeorm', color: '#FE0803' },
      { name: 'Supabase', slug: 'supabase', color: '#3FCF8E' },
    ],
  },
]
