// Full stack table shown in the homepage "Stack" section, grouped the way a
// spec sheet would group them. CORE_STACK (coreStack.js) is the short list
// named in the hero bio; this is the complete set.
//
// `color` follows each technology's brand where it stays legible on this dark
// background. Marks without a usable brand icon use TechIcon's generic glyph.
export const STACK_CATEGORIES = [
  {
    label: '01 Language',
    items: [{ name: 'TypeScript', slug: 'typescript', color: '#3178C6' }],
  },
  {
    label: '02 Frontend',
    items: [
      { name: 'React', slug: 'react', color: '#61DAFB' },
      { name: 'Next.js', slug: 'nextdotjs', color: '#F5F5F5' },
    ],
  },
  {
    label: '03 Backend',
    items: [
      { name: 'Node.js', slug: 'nodedotjs', color: '#83CD29' },
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
  {
    label: '05 AI',
    items: [
      { name: 'LlamaIndex', slug: null, color: '#C8C4F7' },
      { name: 'OpenAI', slug: '/images/openai-logo-white.svg', color: '#F5F5F5' },
      { name: 'Pinecone', slug: null, color: '#A7E3D5' },
    ],
  },
  {
    label: '06 Infra',
    items: [
      { name: 'Docker', slug: 'docker', color: '#2496ED' },
      { name: 'Linux/VPS', slug: 'linux', color: '#FCC624' },
      { name: 'Nginx', slug: 'nginx', color: '#59B955' },
      { name: 'GitHub Actions', slug: 'githubactions', color: '#6DA7FF' },
    ],
  },
]
