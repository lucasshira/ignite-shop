export const revalidate = 7200; // 2 hours

import { stripe } from "@/lib/stripe"

import ProductClient from "@/app/components/ProductClient";
import Stripe from "stripe";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id: productId } =  params;

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    return {
      title: `${product.name} | Ignite Shop`,
      description: product.description || "Produto da Ignite Shop",
    };
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
    return {
      title: "Produto Não Encontrado | Ignite Shop",
      description: "Erro ao carregar o produto",
    };
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id: productId } = params;

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