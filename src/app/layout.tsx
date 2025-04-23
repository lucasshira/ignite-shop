import { Roboto } from 'next/font/google'
import { getCssText } from '@/styles';
import { globalStyles } from '@/styles/global';

import logoImg from '../assets/logo.svg'

import Image from 'next/image';
import { Container, Header } from '@/styles/pages/app';
import Link from 'next/link';
import { CartProvider } from 'use-shopping-cart';
import Cart from './components/Cart';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
}
)
export const metadata = {
  title: {
    default: 'Carregando... | Ignite Shop',
    template: '%s | Ignite Shop',
  },
  description: 'Ignite Shop',
}

globalStyles()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body className={roboto.className}>
      <CartProvider
        shouldPersist
        cartMode="checkout-session"
        currency="EUR"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
        loading={<p aria-live="polite">Loading...</p>}
      >
        <Container>
          <Header>
            <Link href="/">
              <Image src={logoImg} alt="Ignite Shop Logo" />
            </Link>
              <Cart />
          </Header>
          {children}
        </Container>
      </CartProvider>
      </body>
    </html>
  )
}
