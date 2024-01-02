import { obtenerCategoriaPorSlug } from "@/api/categoria"
import { obtenerProductosPorCategoria } from "@/api/producto"
import ListadoProductos from "@/components/ListadoProductos"

async function Categoria({ params, searchParams }) {

    const { categoria } = params

    const { data: productos } = await obtenerProductosPorCategoria(categoria)

    return (
        <>
            <h2>{categoria}</h2>
            {productos.length > 0 ? (
                <ListadoProductos productos={productos} />
            ) : (
                <div>No hubo resultados...</div>
            )}
        </>
    )
}

export default Categoria