"use server"

export async function crearPedido(token, datos) {

    const url = `${process.env.API_URL}/pedidos`

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            data: datos
        }),
        cache: "no-store"
    })
}

export async function obtenerPedidos(token, usuarioId) {

    const filtro = `filters[usuario][id][$eq]=${usuarioId}`
    const orden = "sort=createdAt:desc"

    const url = `${process.env.API_URL}/pedidos?${filtro}&${orden}`

    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })

    const resultado = await respuesta.json()

    return resultado
}

export async function obtenerPedidoPorSlug(token, slug) {

    const filtro = `filters[slug][$eq]=${slug}`

    const url = `${process.env.API_URL}/pedidos?${filtro}`

    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })

    const resultado = await respuesta.json()

    return resultado.data[0]
} 