"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FunnelProgress } from "@/components/funnel-progress";
import { ProductImage } from "@/components/product-image";
import {
  products,
  bundles,
  getBundlePrice,
  getProduct,
  type Bundle,
} from "@/lib/products";
import { useCart } from "@/lib/cart-context";

function formatPrice(cents: number) {
  return `$${cents.toFixed(2)}`;
}

export default function SalesPage() {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    "smart-routine"
  );
  const { setItemsFromBundle } = useCart();
  const router = useRouter();

  function handleContinue() {
    const bundle = bundles.find((b) => b.id === selectedBundleId);
    if (bundle) {
      setItemsFromBundle(bundle.productIds);
      router.push("/op");
    }
  }

  return (
    <>
      <FunnelProgress />

      <section className="max-w-4xl mx-auto px-4 pt-8 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Choose your Smart Pet setup
        </h1>
        <p className="text-text-muted max-w-lg mx-auto">
          Pick the bundle that fits your routine. Every bundle ships free and
          includes a 30-day satisfaction guarantee.
        </p>
      </section>

      {/* Individual products */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <h2 className="text-lg font-semibold mb-4">Our products</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-border bg-white p-4 flex flex-col"
            >
              <ProductImage name={product.name} className="h-36 mb-3" />
              <span className="text-xs font-medium uppercase tracking-wide text-primary mb-1">
                {product.category === "core"
                  ? "Core"
                  : product.category === "upgrade"
                    ? "Upgrade"
                    : "Hygiene"}
              </span>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-text-muted flex-1 mb-3">
                {product.shortDescription}
              </p>
              <ul className="text-xs text-text-muted space-y-1 mb-3">
                {product.keyBenefits.slice(0, 3).map((b) => (
                  <li key={b} className="flex gap-1.5">
                    <span className="text-accent shrink-0">&#10003;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-lg">{formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bundles */}
      <section className="bg-white border-y border-border py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-semibold mb-6 text-center">
            Save more with a bundle
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {bundles.map((bundle) => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                selected={selectedBundleId === bundle.id}
                onSelect={() => setSelectedBundleId(bundle.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <button
          onClick={handleContinue}
          className="inline-block rounded-lg px-8 py-3.5 font-semibold text-white bg-primary hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Continue to Checkout
        </button>
        <p className="text-xs text-text-muted mt-3">
          You selected:{" "}
          <strong>
            {bundles.find((b) => b.id === selectedBundleId)?.name}
          </strong>
        </p>
      </section>
    </>
  );
}

function BundleCard({
  bundle,
  selected,
  onSelect,
}: {
  bundle: Bundle;
  selected: boolean;
  onSelect: () => void;
}) {
  const { original, discounted, savings } = getBundlePrice(bundle);
  const bundleProducts = bundle.productIds
    .map((id) => getProduct(id))
    .filter(Boolean);

  return (
    <button
      onClick={onSelect}
      className={`rounded-lg border-2 p-5 text-left transition-colors w-full ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-white hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold">{bundle.name}</h3>
        {bundle.badge && (
          <span className="text-xs font-semibold bg-accent text-white rounded-full px-2 py-0.5">
            {bundle.badge}
          </span>
        )}
      </div>
      <p className="text-sm text-text-muted mb-3">{bundle.tagline}</p>
      <ul className="text-xs text-text-muted space-y-1 mb-4">
        {bundleProducts.map((p) => (
          <li key={p!.id}>&#8226; {p!.name}</li>
        ))}
      </ul>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold">{formatPrice(discounted)}</span>
        {savings > 0 && (
          <>
            <span className="text-sm text-text-muted line-through">
              {formatPrice(original)}
            </span>
            <span className="text-xs font-medium text-accent">
              Save {formatPrice(savings)}
            </span>
          </>
        )}
      </div>
      {selected && (
        <div className="mt-3 text-xs text-primary font-medium flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Selected
        </div>
      )}
    </button>
  );
}
