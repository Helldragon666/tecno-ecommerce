"use server"

export async function obtenerUltimoProducto() {

    const url = `${process.env.API_URL}/productos?populate[0]=imagen&populate[1]=categoria&sort=createdAt:desc&pagination[limit]=1`
    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado
}

export async function obtenerUltimosProductos({ limite, categoriaId }) {

    const filtro = categoriaId && `filters[categoria][id][$eq]=${categoriaId}`
    const cantidad = `pagination[limit]=${limite}`
    const ordenDescendente = "sort=createdAt:desc"
    const populate = "populate[0]=imagen&populate[1]=categoria"

    const url = `${process.env.API_URL}/productos?${filtro}&${cantidad}&${ordenDescendente}&${populate}`

    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado
}

export async function obtenerProductosPorCategoria(categoria) {

    const filtro = `filters[categoria][slug][$eq]=${categoria}`
    const cantidad = "pagination[limit]=60"
    const populate = "populate[0]=imagen&populate[1]=categoria"

    const url = `${process.env.API_URL}/productos?${filtro}&${cantidad}&${populate}`

    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado

}

export async function buscarProductos(termino) {

    const filtro = `filters[titulo][$contains]=${termino}`
    const cantidad = "pagination[limit]=60"
    const populate = "populate[0]=imagen&populate[1]=categoria"

    const url = `${process.env.API_URL}/productos?${filtro}&${cantidad}&${populate}`

    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado
}

export async function obtenerProductoPorSlug(slug) {

    const filtro = `filters[slug][$eq]=${slug}`

    const url = `${process.env.API_URL}/productos?${filtro}&populate[0]=imagen&populate[1]=categoria`

    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado.data[0]
}

export async function obtenerProductoPorId(productoId) {

    const url = `${process.env.API_URL}/productos/${productoId}?populate[0]=imagen&populate[1]=categoria`

    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()

    return resultado.data
}