"use client"

import { useEffect, useState } from "react"

import { obtenerListaDeDeseos } from "@/api/wishlist"
import useAuth from "@/hooks/useAuth"
import ProductoEnLista from "./ProductoEnLista"

function Wishlist() {

    const [listaDeseos, setListaDeseos] = useState([])
    const [recargar, setRecargar] = useState(false)

    const { usuario, tokenAcceso } = useAuth()

    useEffect(() => {
        (async () => {
            const datos = await obtenerListaDeDeseos(tokenAcceso, usuario.id)
            setListaDeseos(datos)
        })()
    }, [recargar])

    return (
        <div>{listaDeseos.length !== 0 ? listaDeseos.map(productoLista => (
            <ProductoEnLista
                key={productoLista.id}
                productoLista={productoLista}
                tokenAcceso={tokenAcceso}
                recargar={recargar}
                setRecargar={setRecargar}
            />
        )) : <div>Tu lista de deseos esta vacía</div>}</div>
    )
}

export default Wishlist