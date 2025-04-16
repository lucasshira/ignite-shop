export const revalidate = 7200; // 2 hours

import { stripe } from "@/lib/stripe"

import ProductClient from "@/app/components/ProductClient";
import Stripe from "stripe";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = await params;

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    })

      const price = product.default_price as Stripe.Price

      const formattedProduct = {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: String(product.description),
        price: new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: "EUR",
        }).format(Number(price.unit_amount ?? 0) / 100),
        defaultPriceId: price.id,
      };

    return <ProductClient product={formattedProduct} />
  } catch (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products</div>
  }
}