import { Roboto } from 'next/font/google'
import { getCssText } from '@/styles';
import { globalStyles } from '@/styles/global';

import logoImg from '../assets/logo.svg'

import Image from 'next/image';
import { Container, Header } from '@/styles/pages/app';
import Link from 'next/link';

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
}
)
export const metadata = {
  title: 'Ignite Shop',
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
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="Ignite Shop Logo" />
          </Link>
        </Header>
        {children}
      </Container>
      </body>
    </html>
  )
}
