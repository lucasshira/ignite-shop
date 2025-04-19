import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
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
  } catch (error) {
    console.error("Error fetching session:", error)
    return <div>Error loading session</div>
  }

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;
  const productName = product.name;
  const productImageUrl = product.images[0];

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={productImageUrl} alt="" width={120} height={110} />
      </ImageContainer>

      <p>Uhuul <strong>{customerName}</strong>, sua <strong>{productName}</strong> já está a caminho da sua casa.</p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}