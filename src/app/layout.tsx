import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "[Your Brand] Smart Automatic Self-Cleaning Cat Litter Box",
  description:
    "Premium smart self-cleaning litter box with app control, 72 L capacity, and advanced odor elimination for modern cat homes.",
  keywords: [
    "smart self-cleaning litter box",
    "automatic cat litter box",
    "app controlled pet product",
    "premium cat litter box",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-border py-6 text-center text-sm text-text-muted">
            &copy; {new Date().getFullYear()} [Your Brand]. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
