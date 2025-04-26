import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const { lineItems } = body;

  if (!lineItems || lineItems.length === 0) {
    return new Response("Items not provided", { status: 400 });
  }

  const success_url = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: "payment",
    line_items: lineItems,
  })

  return new Response(JSON.stringify({ checkoutUrl: checkoutSession.url }), {
    status: 201,
  });
}