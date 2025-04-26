import { CartItem, CartItems, CloseButton, DrawerContainer, Overlay } from "@/styles/components/drawer/container";
import axios from "axios";
import { PlusIcon, MinusIcon, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Product } from "use-shopping-cart/core";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) { 
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { cartDetails, removeItem, incrementItem, decrementItem } = useShoppingCart();

  const parsePrice = (priceString: string) => {
    const cleaned = priceString.replace(/[^\d,.-]/g, '').replace(',', '.');
    return parseFloat(cleaned);
  };

  const calculateTotalItems = () => {
    const total = Object.values(cartDetails || {}).reduce((acc, item) => {
      const price = parsePrice(Number(item.price).toFixed(2).replace('.', ','));
      const quantity = Number(item.quantity);
      return acc + price * quantity;
    }, 0);
  
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'EUR',
    }).format(total);
  };

  async function handleBuyProduct() {
    if (!cartDetails) return;

    const lineItems = Object.entries(cartDetails).map((product) => ({
      price: product[1],
      quantity: product[1].quantity,
    }));

    console.log(lineItems, 'lineItems enviados para Stripe');

    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        lineItems
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
            <p>Seu carrinho está vazio.</p>
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
                    <span>
                      <button onClick={() => incrementItem(value.id)}><PlusIcon size={14} /></button>
                        {value.quantity}
                      <button onClick={() => decrementItem(value.id)}><MinusIcon size={14} /></button>
                    </span>
                  </main>
                </div>
              </CartItem>
            ))
          )}
          {Object.keys(cartDetails!).length > 0 && (
            <footer>
              <div>
                <p>Quantidade: </p>
                <span>
                  {Object.values(cartDetails!).reduce((acc, item) => {
                    return acc + item.quantity;
                  }, 0) + ' item(s)'}
                </span>
              </div>

              <div>
                <strong>Valor total</strong>
                <strong>
                  {calculateTotalItems()}
                </strong>
              </div>

              <button
                disabled={isCreatingCheckoutSession}
                onClick={handleBuyProduct}
              >
                Finalizar compra
              </button>
            </footer>
          )}
        </CartItems>
      </DrawerContainer>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  )
}