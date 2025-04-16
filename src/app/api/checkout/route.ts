import { stripe } from "@/lib/stripe";

export async function GET({ params }: { params: { id: string } }) {
  const priceId = params.id;

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