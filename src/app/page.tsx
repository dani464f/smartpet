"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";

const gallery = [
  "Product Hero Render",
  "Cat Comfort Lifestyle",
  "Waste Drawer Maintenance",
  "App Monitoring Dashboard",
];

const specs = [
  ["Capacity", "72 L large interior for single or multi-cat homes"],
  ["App Support", "Android & iOS (Pet Zero, Tuya, Smart Life)"],
  ["Cleaning", "Automated rake cycle with anti-pinch safety sensors"],
  ["Odor Control", "Deodorization gel + sealed waste drawer"],
  ["Noise", "Ultra-quiet motor < 38 dB"],
  ["Power", "100-240V AC with low standby energy mode"],
];

const faqs = [
  {
    q: "Is the box safe for kittens and larger cats?",
    a: "Yes. Smart sensors detect occupancy and lock cleaning while your cat is inside. The 72 L chamber supports cats from 3.3 to 22 lbs.",
  },
  {
    q: "How often do I need to empty the waste bin?",
    a: "Most homes empty every 7–12 days depending on cat count. The app sends full-bin alerts.",
  },
  {
    q: "What litter type works best?",
    a: "Use clumping litter with granule size below 3 mm for best automatic separation and minimal dust.",
  },
  {
    q: "Do you offer warranty and local support?",
    a: "Every unit includes a 2-year warranty, 30-day returns, and live chat support 7 days/week.",
  },
];

const reviews = [
  {
    name: "Olivia R.",
    text: "No scooping, no odor, and my two cats adapted in 2 days. The app alerts are perfect when I'm traveling.",
  },
  {
    name: "Marcus T.",
    text: "Looks premium, runs quietly, and cleanup takes minutes each week. Best pet purchase this year.",
  },
  {
    name: "Priya L.",
    text: "I use Smart Life app and can track usage patterns. It's helped us monitor our senior cat better.",
  },
];

function PriceBlock({ quantity }: { quantity: number }) {
  const base = 699;
  const total = base * quantity;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <p className="text-sm text-text-muted">Premium Launch Price</p>
      <p className="text-3xl font-bold text-text">${base.toFixed(2)}</p>
      <p className="text-sm text-text-muted">Total: ${total.toFixed(2)} ({quantity} unit)</p>
      <p className="mt-2 text-xs text-accent font-semibold">Free tracked shipping + 30-day risk-free trial</p>
    </div>
  );
}

export default function Home() {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"details" | "specs" | "faq">("details");
  const [currency, setCurrency] = useState("USD");
  const [reviewIndex, setReviewIndex] = useState(0);

  const currentReview = reviews[reviewIndex];

  const convertedPrice = useMemo(() => {
    const base = 699;
    if (currency === "EUR") return `€${(base * 0.92).toFixed(2)}`;
    if (currency === "GBP") return `£${(base * 0.79).toFixed(2)}`;
    return `$${base.toFixed(2)}`;
  }, [currency]);

  return (
    <div className="bg-surface">
      <section id="home" className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Premium Smart Litter Solution
          </span>
          <h1 className="text-4xl font-bold leading-tight text-text md:text-5xl">
            Smart Living for Happy Cats – Automatic Self-Cleaning Litter Box
          </h1>
          <p className="text-lg text-text-muted">
            The Smart Automatic Self-Cleaning Cat Litter Box delivers automatic cleaning & deodorization,
            app-connected control, and a spacious 72 L design for cleaner homes and healthier cats.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">
              Shop Now
            </a>
            <a href="#shop" className="rounded-full border border-border bg-white px-6 py-3 font-semibold text-text hover:bg-surface-alt">
              Pre-Order Today
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-4 text-sm">
              <p className="font-semibold">No-Scoop Cleaning</p>
              <p className="text-text-muted">Automatic cycle after each use.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-sm">
              <p className="font-semibold">Odor Control</p>
              <p className="text-text-muted">Triple deodorization defense.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 text-sm">
              <p className="font-semibold">App Convenience</p>
              <p className="text-text-muted">Track and control from anywhere.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6 shadow-lg">
          <div className="mb-4 rounded-2xl bg-surface-alt p-10 text-center text-sm text-text-muted">
            Logo Placeholder + Product Hero Image
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-surface-alt p-2 text-center text-xs text-text-muted">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium text-text">★★★★★ 4.9/5 from verified cat parents</p>
        </div>
      </section>

      <section id="shop" className="border-y border-border bg-white py-12">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-primary">SKU: SCB-72L-PRO</p>
            <h2 className="text-3xl font-bold">Smart Automatic Self-Cleaning Cat Litter Box</h2>
            <p className="text-text-muted">Optimized for hygiene, comfort, and minimal maintenance.</p>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Automatic cleaning & deodorization with smart sensors.</li>
              <li>• Large 72 L capacity, suitable for modern multi-cat households.</li>
              <li>• App control with Pet Zero / Tuya / Smart Life on iOS & Android.</li>
              <li>• Odor elimination through sealed waste bin and deodorizing system.</li>
              <li>• Easy maintenance design with one-touch waste drawer removal.</li>
              <li>• Smart monitoring for cat usage habits and wellness checks.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="qty" className="text-sm font-semibold">Quantity</label>
              <input
                id="qty"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-20 rounded-lg border border-border px-3 py-2"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
              <span className="text-sm font-semibold">From {convertedPrice}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => addItem("smart-litter-box", quantity)}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Add to Cart
              </button>
              <button className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-surface-alt">
                Buy with Confidence
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs text-text-muted sm:grid-cols-3">
              <span className="rounded-lg border border-border p-2 text-center">🔒 100% Secure Checkout</span>
              <span className="rounded-lg border border-border p-2 text-center">↩️ 30-Day Return</span>
              <span className="rounded-lg border border-border p-2 text-center">🚚 Fast Delivery</span>
            </div>
          </div>

          <div className="space-y-4">
            <PriceBlock quantity={quantity} />
            <div className="rounded-2xl border border-border bg-surface-alt p-4">
              <p className="text-sm font-semibold">Fast Payment Options</p>
              <p className="text-xs text-text-muted">Shop Pay, Apple Pay, Google Pay, PayPal, cards.</p>
              <p className="mt-2 text-xs text-text-muted">Multi-currency checkout enabled for US, EU, and UK shoppers.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 w-full max-w-6xl px-4">
          <div className="flex gap-2">
            {[
              ["details", "Product Details"],
              ["specs", "Technical Specs"],
              ["faq", "FAQ"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key as "details" | "specs" | "faq")}
                className={`rounded-full px-4 py-2 text-sm ${tab === key ? "bg-primary text-white" : "border border-border bg-white"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-white p-5 text-sm text-text-muted">
            {tab === "details" && (
              <p>
                Built for premium households, this litter box combines comfort-forward design for cats with
                a hands-free cleaning cycle for owners. The deodorization chamber and sealed waste bin reduce
                lingering smells, while app alerts simplify daily pet care.
              </p>
            )}
            {tab === "specs" && (
              <ul className="space-y-2">
                {specs.map(([label, value]) => (
                  <li key={label}><span className="font-semibold text-text">{label}: </span>{value}</li>
                ))}
              </ul>
            )}
            {tab === "faq" && (
              <div className="space-y-3">
                {faqs.map((item) => (
                  <div key={item.q}>
                    <p className="font-semibold text-text">{item.q}</p>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Why Choose Us</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Traditional Litter Box</th>
                <th className="p-3">[Your Brand] Smart Automatic</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border"><td className="p-3">Daily Cleaning</td><td className="p-3">Manual scooping 1-2x/day</td><td className="p-3">Automatic clean cycle</td></tr>
              <tr className="border-t border-border"><td className="p-3">Odor Management</td><td className="p-3">Open tray, lingering smell</td><td className="p-3">Sealed drawer + deodorization</td></tr>
              <tr className="border-t border-border"><td className="p-3">Monitoring</td><td className="p-3">No visibility</td><td className="p-3">App usage insights & alerts</td></tr>
              <tr className="border-t border-border"><td className="p-3">Maintenance</td><td className="p-3">Frequent deep cleaning</td><td className="p-3">Quick waste-bin replacement</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="mt-10 text-xl font-semibold">How It Works</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">1) Sensor Detection</p><p className="text-sm text-text-muted">Infrared sensors detect cat entry/exit safely.</p></div>
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">2) Auto Clean Cycle</p><p className="text-sm text-text-muted">After a delay, clumps are separated and moved to the sealed bin.</p></div>
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">3) Waste Collection</p><p className="text-sm text-text-muted">Waste lands in disposable liner with odor-locking design.</p></div>
        </div>
      </section>

      <section id="reviews" className="border-y border-border bg-white py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="mt-4 rounded-2xl border border-border bg-surface p-6">
            <p className="text-lg">“{currentReview.text}”</p>
            <p className="mt-3 text-sm font-semibold">— {currentReview.name}</p>
            <div className="mt-4 flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setReviewIndex(index)}
                  className={`h-2 w-10 rounded-full ${reviewIndex === index ? "bg-primary" : "bg-border"}`}
                  aria-label={`Show review ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-text-muted">Integrate with Judge.me / Loox / Yotpo for verified review sync.</p>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Warranty, Support & App Compatibility</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-5 text-sm text-text-muted">
            <p className="font-semibold text-text">Support Promise</p>
            <p>2-year warranty, onboarding assistance, and replacement part support.</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 text-sm text-text-muted">
            <p className="font-semibold text-text">App Compatibility</p>
            <p>Works with Pet Zero, Tuya, and Smart Life on Android and iOS.</p>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Recommended Add-ons</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">Odor Eliminator Refills</p><p className="text-sm text-text-muted">Subscription-ready refill packs.</p></div>
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">Waterproof Litter Mats</p><p className="text-sm text-text-muted">Trap litter tracking around the box.</p></div>
          <div className="rounded-2xl border border-border bg-white p-4"><p className="font-semibold">Protective Liners</p><p className="text-sm text-text-muted">Bundle with 3/6-month maintenance kits.</p></div>
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-surface-alt py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-border bg-white p-6 text-center">
            <h2 className="text-2xl font-bold">Join for 10% off and free shipping deals</h2>
            <p className="mt-2 text-sm text-text-muted">Email popup concept ready for Shopify app integration (Klaviyo / Omnisend).</p>
            <div className="mx-auto mt-4 flex max-w-md gap-2">
              <input className="flex-1 rounded-lg border border-border px-3 py-2" placeholder="Enter your email" />
              <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">Join</button>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-text-muted">Smart Automatic Litter Box</p>
            <p className="text-sm font-bold">$699.00</p>
          </div>
          <button
            onClick={() => addItem("smart-litter-box", quantity)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
          >
            Sticky Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
