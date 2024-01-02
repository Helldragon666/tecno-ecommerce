"use client"

import { useEffect, useState } from "react"

import useAuth from "@/hooks/useAuth"
import { obtenerPedidos } from "@/api/pedidos"
import Pedido from "./Pedido"

function Pedidos() {

    const [pedidos, setPedidos] = useState([])

    const { tokenAcceso, usuario } = useAuth()

    useEffect(() => {
        (async () => {
            const { data } = await obtenerPedidos(tokenAcceso, usuario.id)
            setPedidos(data)
        })()
    }, [])

    return (
        <div>{pedidos.length !== 0 ? pedidos.map(pedido => (
            <Pedido key={pedido.id} pedido={pedido} />
        )) : <div>No tienes ningún pedido</div>}
        </div>
    )
}

export default Pedidos