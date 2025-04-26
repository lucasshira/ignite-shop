"use client"

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { Product } from "./HomeClient";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem, incrementItem, cartDetails } = useShoppingCart();

  const handleAddToCart = () => { 
    const isItemInCart = cartDetails && cartDetails[product.id];

    if (isItemInCart) {
      incrementItem(product.id, { count: 1 });
    } else {
      addItem({
        id: product.defaultPriceId,
        name: product.name,
        price: product.price,
        priceId: product.defaultPriceId,
        currency: "EUR",
        image: product.imageUrl,
        description: product.description,
        quantity: 1,
      });
    }

    console.log(cartDetails, 'cartDetails depois de adicionar o produto');
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