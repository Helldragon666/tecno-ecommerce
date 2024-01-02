"use server"

export async function obtenerCategorias() {
    const url = `${process.env.API_URL}/categorias?sort=orden:asc`
    const respuesta = await fetch(url, { cache: "no-store" })
    const resultado = await respuesta.json()
    return resultado
}


export async function obtenerCategoriaPorSlug(slug) {
    const url = `${process.env.API_URL}/categorias?filters[slug][$eq]=${slug}`
    const respuesta = await fetch(url, {cache: "no-store"})
    const resultado = await respuesta.json()
    return resultado.data[0]
}