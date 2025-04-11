export default function Page({ params }: { params: string }) {
  const { id } = params

  return (
    <h1>Produto {id}</h1>
  )
}