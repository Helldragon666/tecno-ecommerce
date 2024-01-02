"use cient"

import { useState, useEffect } from "react"

import Image from "next/image"
import Link from "next/link"

import { obtenerUltimoProducto } from "@/api/producto"
import { formatearPrecio } from "@/utils/funciones"
import { imagenURL } from "@/utils/variables"

import styles from "@/styles/ultimoProducto.module.css"

function UltimoProducto() {

    const [producto, setProducto] = useState(null)

    useEffect(() => {
        (async () => {
            const { data } = await obtenerUltimoProducto()
            setProducto(data[0])
        })()
    }, [])

    if (!producto) {
        return null
    }

    const { attributes, id } = producto
    const { titulo, precio, descuento, slug, descripcion, categoria, imagen } = attributes
    const { url } = imagen.data.attributes

    return (
        <div className={styles.ultimoProducto}>
            <Image
                width={200}
                height={100}
                src={`${imagenURL}${url}`}
                alt="imagen producto"
            />
            <div className={styles.informacion}>
                <h2>{titulo}</h2>
                <p>Descripción {descripcion}</p>
                <p className={styles.precio}>{formatearPrecio(precio)}</p>
                <Link className={styles.enlace} href={`/producto/${slug}`}>Ver producto</Link>
            </div>
        </div>
    )
}

export default UltimoProducto