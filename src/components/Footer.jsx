export default function Footer() {
  return (
    <footer className="flex flex-col items-start gap-3 px-5 py-6 font-mono text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span>© {new Date().getFullYear()} Saifullah Khan</span>
      <span>Clear communication, on time, every time</span>
    </footer>
  )
}
