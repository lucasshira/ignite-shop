export const revalidate = 7200; // 2 hours

import { stripe } from "@/lib/stripe"
import HomeClient, { Product } from "./components/HomeClient"
import Stripe from "stripe"

export default async function HomePage() {
  try {
    const response = await stripe.products.list({
      expand: ["data.default_price"],
    })
  
    const products = response.data.map((product): Product => {
      const price = product.default_price as Stripe.Price
  
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: String(product.description),
        price: new Intl.NumberFormat("pt-PT", {
          style: "currency",
          currency: 'EUR',
        }).format(Number(price.unit_amount ?? 0) / 100),
      }
    })
  
    return <HomeClient products={products} />
  } catch (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products</div>
  }
}