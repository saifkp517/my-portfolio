export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-5 font-mono text-[11px] text-white/35 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Saifullah Khan</span>
        <span>Clear communication, on time, every time</span>
      </div>
    </footer>
  )
}
