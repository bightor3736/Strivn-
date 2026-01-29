const footerLinks = [
  {
    title: "Product",
    items: ["Features", "Integraties", "Security"]
  },
  {
    title: "Company",
    items: ["Over ons", "Careers", "Contact"]
  },
  {
    title: "Resources",
    items: ["Blog", "Cases", "Support"]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-900/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">Strivn</p>
          <p className="mt-2 text-sm text-muted-300">
            B2B growth intelligence die je pipeline versnelt.
          </p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-300">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-xs text-muted-300">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 md:flex-row md:justify-between">
          <span>© 2024 Strivn. Alle rechten voorbehouden.</span>
          <span>Disclaimer: demo content voor concept doeleinden.</span>
        </div>
      </div>
    </footer>
  );
}
