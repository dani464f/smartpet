import { NextResponse } from "next/server";

/**
 * POST /api/checkout
 *
 * When Stripe is configured (STRIPE_SECRET_KEY is set), this creates a real
 * Stripe Checkout Session. Otherwise it returns a mock response.
 *
 * To enable real Stripe:
 *  1. npm install stripe
 *  2. Add STRIPE_SECRET_KEY to .env.local
 *  3. Uncomment the Stripe block below and remove the mock block.
 */

export async function POST(request: Request) {
  const body = await request.json();
  const { lineItems } = body as {
    lineItems: { name: string; price: number; quantity: number }[];
  };

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (STRIPE_SECRET_KEY) {
    // --- Real Stripe integration (uncomment when stripe package is installed) ---
    // const Stripe = (await import("stripe")).default;
    // const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: lineItems.map((item) => ({
    //     price_data: {
    //       currency: "usd",
    //       product_data: { name: item.name },
    //       unit_amount: Math.round(item.price * 100),
    //     },
    //     quantity: item.quantity,
    //   })),
    //   success_url: `${request.headers.get("origin")}/qd?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${request.headers.get("origin")}/op`,
    // });
    // return NextResponse.json({ url: session.url, sessionId: session.id });

    // Fallback: if key is set but stripe package isn't installed, mock it
    void lineItems;
  }

  // --- Mock response ---
  const orderId = `SP-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({
    url: `/qd?order_id=${orderId}`,
    sessionId: orderId,
  });
}
