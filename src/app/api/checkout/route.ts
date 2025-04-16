import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const priceId = body.priceId;

  if (!priceId) {
    return new Response("Price ID not provided", { status: 400 });
  }

  const success_url = `${process.env.NEXT_PUBLIC_URL}/success`;
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  return new Response(JSON.stringify({ checkoutUrl: checkoutSession.url }), {
    status: 201,
  });
}