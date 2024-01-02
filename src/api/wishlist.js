"use server"

export async function obtenerProductoEnLista(token, usuarioId, productoId) {

    const filtroUsuario = `filters[usuario][id][$eq][0]=${usuarioId}`
    const filtroProducto = `filters[producto][id][$eq][1]=${productoId}`

    const url = `${process.env.API_URL}/wishlists?${filtroUsuario}&${filtroProducto}`

    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })
    const resultado = await respuesta.json()

    if (resultado.data.length === 0) {
        return {}
    }

    return resultado.data[0]
}

export async function agregarProductoALaLista(token, usuarioId, productoId) {

    const url = `${process.env.API_URL}/wishlists`

    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            data: {
                usuario: usuarioId,
                producto: productoId
            }
        }),
        cache: "no-store"
    })
    const resultado = await respuesta.json()

    return resultado.data
}

export async function eliminarProductoDeLaLista(token, enlistaId) {

    const url = `${process.env.API_URL}/wishlists/${enlistaId}`

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })
}

export async function obtenerListaDeDeseos(token, usuarioId) {

    const populate = "populate[0]=producto&populate[1]=producto.imagen"
    
    const url = `${process.env.API_URL}/wishlists?filters[usuario][id][$eq]=${usuarioId}&${populate}`

    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })

    const resultado = await respuesta.json()

    return resultado.data
}