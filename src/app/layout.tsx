import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Smart Pet Care — Automated Pet Care Ecosystem",
  description:
    "Upgrade your pet care routine with smart, automated products. Self-cleaning litter, app-controlled feeders, and premium accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border py-6 text-center text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Smart Pet Care. All rights
            reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
