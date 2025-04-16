"use client"

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { Product } from "./HomeClient";
import Image from "next/image";

export default function ProductClient({ product }: { product: Product }) {

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

        <button type="button">
          <a href={`/checkout/${product.defaultPriceId}`}>
          Comprar agora
          </a>
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}