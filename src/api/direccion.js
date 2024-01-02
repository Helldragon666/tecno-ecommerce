"use server"

export async function crearDireccion(usuarioId, token, datos) {

    const url = `${process.env.API_URL}/direccions`

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            data: {
                ...datos,
                usuario: usuarioId
            }
        }),
        cache: "no-store"
    })
}

export async function obtenerDirecciones(token, usuarioId) {

    const url = `${process.env.API_URL}/direccions?filters[usuario][id][$eq]=${usuarioId}`

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

export async function actualizarDireccion(token, direccionId, datos) {

    const url = `${process.env.API_URL}/direccions/${direccionId}`

    await fetch(url, {
        method: "PUT",
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

export async function eliminarDirecion(token, direccionId) {

    const url = `${process.env.API_URL}/direccions/${direccionId}`

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })
}