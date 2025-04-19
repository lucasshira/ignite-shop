import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carregando... | Ignite Shop',
  description: 'Aguardando carregamento...',
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}