"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FunnelProgress } from "@/components/funnel-progress";
import { getProduct, products, type Product } from "@/lib/products";

export default function PostPurchasePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-20 text-center text-text-muted">
          Loading order details…
        </div>
      }
    >
      <PostPurchaseContent />
    </Suspense>
  );
}

function PostPurchaseContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") ?? "N/A";

  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Read purchased products from localStorage
    try {
      const raw = localStorage.getItem("smartpet_order");
      if (raw) {
        const data = JSON.parse(raw) as { productIds: string[] };
        const prods = data.productIds
          .map((id: string) => getProduct(id))
          .filter(Boolean) as Product[];
        setPurchasedProducts(prods);
      }
    } catch {
      // ignore parse errors
    }

    // Generate a simple referral code
    setReferralCode(
      `SMARTPET-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    );
  }, []);

  const missingProducts = products.filter(
    (p) => !purchasedProducts.some((pp) => pp.id === p.id)
  );

  function handleCopy() {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <FunnelProgress />

      {/* Thank you */}
      <section className="max-w-2xl mx-auto px-4 pt-8 pb-6 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-text-muted">
          Order <span className="font-mono font-medium">{orderId}</span> has
          been confirmed. Here&apos;s how to get started.
        </p>
      </section>

      {/* Setup steps per product */}
      {purchasedProducts.length > 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-10">
          <h2 className="text-lg font-semibold mb-4">Setup instructions</h2>
          <div className="space-y-6">
            {purchasedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border bg-white p-5"
              >
                <h3 className="font-semibold mb-3">{product.name}</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-text-muted">
                  {product.setupSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommend missing products */}
      {missingProducts.length > 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-10">
          <h2 className="text-lg font-semibold mb-2">
            Complete your ecosystem
          </h2>
          <p className="text-sm text-text-muted mb-4">
            You&apos;re missing {missingProducts.length === 1 ? "one piece" : "a few pieces"}{" "}
            of the full smart setup. Add them to get the most out of your
            investment.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {missingProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-border bg-white p-4 flex flex-col"
              >
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-text-muted flex-1 mb-3">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link
                    href="/sp"
                    className="rounded-lg border border-primary text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    View in Shop
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Referral */}
      <section className="bg-white border-y border-border py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-lg font-semibold mb-2">
            Share with a friend — get $15 off
          </h2>
          <p className="text-sm text-text-muted mb-4">
            Give your friends 10% off their first order and earn $15 credit for
            every referral.
          </p>
          <div className="flex items-center gap-2 justify-center">
            <code className="bg-surface-alt border border-border rounded-lg px-4 py-2 text-sm font-mono">
              {referralCode || "…"}
            </code>
            <button
              onClick={handleCopy}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Review prompt */}
      <section className="max-w-md mx-auto px-4 py-10 text-center">
        <h2 className="text-lg font-semibold mb-2">Enjoying your products?</h2>
        <p className="text-sm text-text-muted mb-4">
          We&apos;d love to hear about your experience. Leave a review to help
          other pet parents discover smarter care.
        </p>
        <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium hover:bg-surface-alt transition-colors">
          Leave a Review
        </button>
      </section>
    </>
  );
}
