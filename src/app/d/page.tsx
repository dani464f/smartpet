import { CTAButton } from "@/components/cta-button";
import { FunnelProgress } from "@/components/funnel-progress";
import { products } from "@/lib/products";

export const metadata = {
  title: "Discover Smart Pet Care",
};

export default function DemandPage() {
  return (
    <>
      <FunnelProgress />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-12 text-center">
        <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
          Smart Pet Care
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
          Your pet deserves a smarter daily routine
        </h1>
        <p className="text-lg text-text-muted max-w-xl mx-auto mb-8">
          An integrated ecosystem of automated products that handle litter,
          feeding, and hydration — so you can spend more time bonding and less
          time cleaning.
        </p>
        <CTAButton href="/pre-sales">See how it works</CTAButton>
      </section>

      {/* Ecosystem overview */}
      <section className="bg-white border-y border-border py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold text-center mb-8">
            Three products. One seamless routine.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border p-5 text-center"
              >
                <div className="w-16 h-16 bg-surface-alt rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl" aria-hidden="true">
                    {product.category === "core"
                      ? "🪣"
                      : product.category === "upgrade"
                        ? "🍽️"
                        : "💧"}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-text-muted">
                  {product.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof teaser */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-text-muted text-sm mb-2">
          Trusted by 12,000+ pet owners
        </p>
        <div className="flex justify-center gap-1 mb-6" aria-label="4.8 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-5 h-5 ${star <= 4 ? "text-yellow-400" : "text-yellow-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.065 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.284-3.957z" />
            </svg>
          ))}
        </div>
        <CTAButton href="/pre-sales" variant="accent">
          See how it works
        </CTAButton>
      </section>
    </>
  );
}
