"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FunnelProgress } from "@/components/funnel-progress";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { processCheckout } from "@/lib/checkout";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function OrderPage() {
  const { items, getLineItems, subtotal, addItem, removeItem } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const lineItems = getLineItems();

  // Products not in the cart — for "complete the setup" upsell
  const missingProducts = products.filter(
    (p) => !items.some((i) => i.productId === p.id)
  );

  async function handlePlaceOrder() {
    if (lineItems.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const email =
        typeof window !== "undefined"
          ? localStorage.getItem("smartpet_email") ?? undefined
          : undefined;

      const result = await processCheckout({
        lineItems: lineItems.map((li) => ({
          productId: li.product.id,
          name: li.product.name,
          price: li.product.price,
          quantity: li.quantity,
        })),
        email,
      });

      if (result.success) {
        // Save purchased product ids so /qd can read them
        localStorage.setItem(
          "smartpet_order",
          JSON.stringify({
            orderId: result.orderId,
            productIds: lineItems.map((li) => li.product.id),
          })
        );
        router.push(`/qd?order_id=${result.orderId}`);
      }
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  if (lineItems.length === 0) {
    return (
      <>
        <FunnelProgress />
        <section className="max-w-lg mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
          <p className="text-text-muted mb-6">
            Pick a bundle to get started with your smart pet care setup.
          </p>
          <a
            href="/sp"
            className="inline-block rounded-lg px-6 py-3 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            Browse Products
          </a>
        </section>
      </>
    );
  }

  return (
    <>
      <FunnelProgress />

      <section className="max-w-2xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Order Summary</h1>

        {/* Line items */}
        <div className="divide-y divide-border border border-border rounded-lg bg-white mb-6">
          {lineItems.map((li) => (
            <div key={li.product.id} className="flex gap-4 p-4">
              <ProductImage
                name={li.product.name}
                className="w-20 h-20 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{li.product.name}</h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Qty: {li.quantity}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold">
                  {formatPrice(li.product.price * li.quantity)}
                </p>
                <button
                  onClick={() => removeItem(li.product.id)}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center py-3 border-t border-border text-lg font-bold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </section>

      {/* Upsell: complete the setup */}
      {missingProducts.length > 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-6">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
            Complete your setup
          </h2>
          <div className="space-y-3">
            {missingProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-lg border border-dashed border-border bg-white p-3"
              >
                <ProductImage
                  name={product.name}
                  className="w-14 h-14 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-text-muted">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <button
                  onClick={() => addItem(product.id)}
                  className="shrink-0 rounded-lg border border-primary text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary hover:text-white transition-colors"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Place order */}
      <section className="max-w-2xl mx-auto px-4 py-8 text-center">
        {error && (
          <p className="text-red-600 text-sm mb-3" role="alert">
            {error}
          </p>
        )}
        <button
          onClick={handlePlaceOrder}
          disabled={processing}
          className="w-full sm:w-auto rounded-lg px-10 py-3.5 font-semibold text-white bg-accent hover:bg-accent-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {processing ? "Processing…" : "Place Order"}
        </button>
        <p className="text-xs text-text-muted mt-3">
          Secure checkout &middot; 30-day money-back guarantee
        </p>
      </section>
    </>
  );
}
