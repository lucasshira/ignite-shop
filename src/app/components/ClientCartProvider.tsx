"use client";

import { CartProvider } from 'use-shopping-cart';
import { ReactNode } from 'react';

export default function ClientCartProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      currency="EUR"
      stripe={process.env.STRIPE_PUBLIC_KEY!}
    >
      {children}
    </CartProvider>
  );
}