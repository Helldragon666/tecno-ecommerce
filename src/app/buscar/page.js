import { buscarProductos } from "@/api/producto"
import ListadoProductos from "@/components/ListadoProductos"

async function Buscar({ searchParams }) {

  const { b } = searchParams

  const { data: productos } = await buscarProductos(b)

  return (
    <>
      {productos.length > 0 ? (
        <ListadoProductos productos={productos} />
      ) : (
        <div className="no-resultados">No hubo resultados...</div>
      )}
    </>
  )
}

export default Buscar