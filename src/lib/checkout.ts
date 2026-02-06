/**
 * Mock / Stripe checkout utility.
 *
 * To plug in real Stripe:
 *  1. npm install stripe @stripe/stripe-js
 *  2. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY in .env.local
 *  3. Replace the mock below with a real Stripe Checkout Session creation
 *     (see /src/app/api/checkout/route.ts for the server side).
 */

export interface CheckoutPayload {
  lineItems: { productId: string; name: string; price: number; quantity: number }[];
  email?: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId: string;
}

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export function isStripeConfigured(): boolean {
  return Boolean(STRIPE_PUBLISHABLE_KEY);
}

/**
 * In mock mode this resolves after a short delay simulating payment.
 * When Stripe is configured, call your /api/checkout endpoint instead and
 * redirect to the Stripe Checkout URL.
 */
export async function processCheckout(
  payload: CheckoutPayload
): Promise<CheckoutResult> {
  if (isStripeConfigured()) {
    // Real Stripe flow: POST to API route which creates a Checkout Session
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Checkout session creation failed");
    }
    const data = await res.json();
    // data.url is the Stripe Checkout redirect URL
    window.location.href = data.url;
    // This won't actually resolve because we redirect, but keep types happy
    return { success: true, orderId: data.sessionId };
  }

  // --- Mock checkout ---
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const orderId = `SP-${Date.now().toString(36).toUpperCase()}`;
  return { success: true, orderId };
}
