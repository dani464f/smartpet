"use client";

import { useCart } from "@/lib/cart-context";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#shop", label: "Shop" },
  { href: "#features", label: "Features" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            YB
          </span>
          <div>
            <p className="text-sm font-semibold text-text leading-tight">[Your Brand]</p>
            <p className="text-xs text-text-muted leading-tight">Pet Tech</p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-muted transition-colors hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#shop"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Cart ({itemCount})
        </a>
      </div>
    </header>
  );
}
