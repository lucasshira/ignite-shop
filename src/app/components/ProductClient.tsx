"use client"

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { Product } from "./HomeClient";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem } = useShoppingCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: "EUR",
      image: product.imageUrl,
      description: product.description,
      quantity: product.quantity,
    });
  };

  return (
    <ProductContainer>
      <ImageContainer>
         <Image 
            src={product.imageUrl} 
            alt="" 
            width={520} 
            height={480} 
          />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleAddToCart}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}