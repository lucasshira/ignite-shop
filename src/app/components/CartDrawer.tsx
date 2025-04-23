import { CartItem, CartItems, CloseButton, DrawerContainer, Overlay } from "@/styles/components/drawer/container";
import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { Product } from "./HomeClient";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product
}

export default function CartDrawer({ isOpen, onClose, product }: CartDrawerProps) { 
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);


  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
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
          <CartItem>
            <Image src={product.imageUrl} alt="" />
            <div>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </div>
          </CartItem>
        </CartItems>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Finalizar compra
        </button>
      </DrawerContainer>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  )
}