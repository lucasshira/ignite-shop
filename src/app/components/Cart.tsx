"use client";

import { ShoppingBagIcon } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartButton } from "@/styles/pages/app";

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useShoppingCart();

  useEffect(() => {
    console.log("cartCount atualizado:", cartCount);
  }, [cartCount]);

  const handleOpenCart = () => {
    setCartOpen(true);
  }

  const handleCloseCart = () => {
    setCartOpen(false);
  }

  return (
    <div>
      <CartButton onClick={handleOpenCart}>
        <ShoppingBagIcon size={24} color="#8D8D99" />
        <span>
          {cartCount || 0}
        </span>
      </CartButton>
      <CartDrawer isOpen={cartOpen} onClose={handleCloseCart} />
    </div>
  )
}
