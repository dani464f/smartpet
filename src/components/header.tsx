"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/d" className="font-bold text-lg text-primary">
          SmartPet
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/sp"
            className="text-text-muted hover:text-text transition-colors"
          >
            Products
          </Link>
          <Link
            href="/op"
            className="relative text-text-muted hover:text-text transition-colors"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
