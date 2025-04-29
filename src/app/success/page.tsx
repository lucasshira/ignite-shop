import { stripe } from "@/lib/stripe";
import { SuccessContainer } from "@/styles/pages/success";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

interface SuccessPageProps {
  searchParams: { session_id: string };
}

export const metadata = {
  title: "Compra efetuada | Ignite Shop",
  description: "Compra efetuada com sucesso",
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return [
      redirect("/"),
    ]
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product", "customer"],
    });
    console.log(session, 'session');
  } catch (error) {
    console.error("Error fetching session:", error)
    return <div>Error loading session</div>
  }

  const customerName = session.customer_details?.name;

  const items = session.line_items?.data.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      product: item.price?.product as Stripe.Product,
      productImageUrl: (item.price?.product as Stripe.Product).images[0],
    }
  })

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <div>
        {items?.map((item) => {
            return (
              <main key={item.id}>
                <Image
                  key={item.id}
                  src={item.productImageUrl}
                  alt=""
                  width={120}
                  height={110}
                />
              </main>
            )
          })}
      </div>

      <p>Uhuul <strong>{customerName}</strong>, sua compra já está a caminho da sua casa.</p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}