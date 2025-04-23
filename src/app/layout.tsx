import { Roboto } from 'next/font/google'
import { getCssText } from '@/styles';
import { globalStyles } from '@/styles/global';

import logoImg from '../assets/logo.svg'

import Image from 'next/image';
import { Container, Header } from '@/styles/pages/app';
import Link from 'next/link';
import Cart from './components/Cart';
import ClientCartProvider from './components/ClientCartProvider';

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
        <ClientCartProvider>
          <Container>
            <Header>
              <Link href="/">
                <Image src={logoImg} alt="Ignite Shop Logo" />
              </Link>
                <Cart />
            </Header>
            {children}
          </Container>
        </ClientCartProvider>
      </body>
    </html>
  )
}
