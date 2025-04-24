import { CartItem, CartItems, CloseButton, DrawerContainer, FinishButton, Overlay } from "@/styles/components/drawer/container";
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
            {cartDetails && Object.entries(cartDetails).map(([key, value]) => {
              return (
                <CartItem key={key}>
                  <Image
                    src={value.image}
                    alt=""
                    width={100} 
                    height={100} 
                  />
                  <div>
                    <p>{value.name}</p>
                    <strong>{value.price}</strong>
                    <main>
                      <button>Remover</button>
                      <span>{value.quantity}</span>
                    </main>
                  </div>
                </CartItem>
              )
            })}
        </CartItems>

        <FinishButton disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Finalizar compra
        </FinishButton>
      </DrawerContainer>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  )
}