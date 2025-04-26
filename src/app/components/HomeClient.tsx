"use client"

import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export type Product = {
  id: string
  name: string
  imageUrl: string
  quantity?: number
  description: string
  price: string
  defaultPriceId: string
}

interface HomeClientProps {
  products: Product[]
}

export default function HomeClient({ products }: HomeClientProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Product className="keen-slider__slide">
              <Image 
                src={product.imageUrl} 
                alt="" 
                width={520} 
                height={480} 
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  );
}