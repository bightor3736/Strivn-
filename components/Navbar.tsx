const links = [
  { label: "Product", href: "#features" },
  { label: "Hoe het werkt", href: "#how" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-bg-900/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-tight">Strivn</span>
        <div className="hidden items-center gap-6 text-sm text-muted-300 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-text-100"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button className="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-bg-900 shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400">
          Plan een demo
        </button>
      </nav>
    </header>
  );
}
