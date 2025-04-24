import { CartItem, CartItems, CloseButton, DrawerContainer, Overlay } from "@/styles/components/drawer/container";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export default function CartDrawer({ isOpen, onClose, product }: CartDrawerProps) { 
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  
  const { cartDetails, removeItem } = useShoppingCart();
  console.log(cartDetails)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product?.defaultPriceId
      });

      const { checkoutUrl } = response.data;
      
      window.location.href = checkoutUrl;
    } catch (error) {
      // TODO: conectar com uma ferramenta de observabilidade (data dog/sentry)

      setIsCreatingCheckoutSession(false);
      alert('Erro ao redirecionar para o checkout');
      console.error(error);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <DrawerContainer isOpen={isOpen}>
        <CloseButton onClick={onClose} aria-label="Fechar carrinho">
          <X size={24} color="#8D8D99" />
        </CloseButton>
        <h2>Sacola de compras</h2>
        <CartItems>
          {Object.keys(cartDetails!).length === 0 ? (
            <p>Seu carrinho está vazio</p>
          ) : (
            Object.entries(cartDetails!).map(([key, value]) => (
              <CartItem key={key}>
                <Image
                  src={value.image!}
                  alt={value.name}
                  width={100}
                  height={100}
                />
                <div>
                  <p>{value.name}</p>
                  <strong>{value.price}</strong>
                  <main>
                    <button onClick={() => removeItem(value.id)}>Remover</button>
                    <span>{value.quantity}</span>
                  </main>
                </div>
              </CartItem>
            ))
          )}
          {Object.keys(cartDetails!).length > 0 && (
            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          )}
        </CartItems>
      </DrawerContainer>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  )
}