"use client"

import { useRouter } from "next/navigation"

import { formatearFecha, formatearPrecio } from "@/utils/funciones"

import styles from "@/styles/pedido.module.css"

function Pedido({ pedido }) {

    const router = useRouter()

    const { id, attributes } = pedido
    const { idPago, createdAt, total, direccion, slug } = attributes

    const { calle, ciudad, estado, codigo_postal, telefono } = direccion.attributes

    return (
        <div
            className={styles.pedido}
            onClick={() => router.push(`/pedido/${slug}`)}
        >
            <h3>Pedido: {idPago}</h3>
            <div className={styles.info}>
                <div>
                    <p>Realizado el: {formatearFecha(createdAt)}</p>
                    <p>Destino: {`${calle} ${ciudad}, ${estado}, C.P. ${codigo_postal}`}</p>
                </div>
                <p className={styles.precio}>Total {formatearPrecio(total)}</p>
            </div>
        </div>
    )
}

export default Pedido