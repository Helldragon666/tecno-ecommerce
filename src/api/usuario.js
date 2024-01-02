"use server"

export async function registrarUsuario(datos) {
    const url = `${process.env.API_URL}/auth/local/register`
    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    const resultado = await respuesta.json()

    return resultado
}

export async function iniciarSesion(datos) {
    const url = `${process.env.API_URL}/auth/local`
    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    const resultado = await respuesta.json()

    return resultado
}

export async function obtenerPerfil(token) {
    const url = `${process.env.API_URL}/users/me`
    const respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    const resultado = await respuesta.json()
    return resultado
}