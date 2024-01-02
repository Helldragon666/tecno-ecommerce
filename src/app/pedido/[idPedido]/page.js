"use client"

import { useEffect, useState } from "react"

import Image from "next/image"

import useAuth from "@/hooks/useAuth"
import { obtenerPedidoPorSlug } from "@/api/pedidos"
import { formatearFecha, formatearPrecio } from "@/utils/funciones"
import { imagenURL } from "@/utils/variables"

import styles from "@/styles/pedidoPage.module.css"

function Pedido({ params }) {

    const { idPedido } = params

    const [pedido, setPedido] = useState({})

    const { tokenAcceso } = useAuth()

    useEffect(() => {
        (async () => {
            const datos = await obtenerPedidoPorSlug(tokenAcceso, idPedido)
            setPedido(datos)
        })()
    }, [])

    if (Object.keys(pedido).length === 0) {
        return null
    }

    const { id, attributes } = pedido
    const { total, direccion, productos, idPago, createdAt } = attributes
    const { calle, ciudad, estado, telefono, codigo_postal } = direccion.attributes

    return (
        <div className={styles.pedido}>
            <h2>Pedido: {idPago}</h2>
            <p className={styles.fecha}>Realizado el: {formatearFecha(createdAt)}</p>
            <div className={styles.direccion}>
                <h3>Dirección:</h3>
                <p>Calle: {calle}, C.P. {codigo_postal}, Municipio: {ciudad}</p>
                <p>Estado: {estado}, Tel: {telefono}</p>
            </div>
            <div className={styles.productos}>
                <h3>Productos:</h3>
                {productos.map(producto => (
                    <div
                        key={producto.id}
                        className={styles.producto}
                    >
                        <Image
                            src={`${imagenURL}${producto.imagen}`}
                            alt="imagen producto"
                            width={100}
                            height={50}
                        />
                        <div className={styles.info}>
                            <div>
                                <h4>{producto.titulo}</h4>
                                <p>Cantidad: {producto.cantidad} piezas</p>
                                <p>Categoría: {producto.categoria}</p>
                            </div>
                            <p className={styles.precio}>Precio: {formatearPrecio(producto.precio)}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Pedido