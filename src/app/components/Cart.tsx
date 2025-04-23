"use client";

import { ShoppingBagIcon } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useState } from "react";

export default function Cart() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleOpenCart = () => {
    setCartOpen(true);
  }

  const handleCloseCart = () => {
    setCartOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpenCart}>
        <ShoppingBagIcon size={24} color="#8D8D99" />
      </button>
      <CartDrawer isOpen={cartOpen} onClose={handleCloseCart} />
    </div>
  )
}