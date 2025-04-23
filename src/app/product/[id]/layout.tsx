"use client";

import { CartProvider } from 'use-shopping-cart';

// export const metadata: Metadata = {
//   title: 'Carregando... | Ignite Shop',
//   description: 'Aguardando carregamento...',
// }

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CartProvider
        shouldPersist
        cartMode="checkout-session"
        currency="EUR"
        stripe={process.env.STRIPE_PUBLIC_KEY}
      >
        {children}
      </CartProvider>
    </>
  )
}