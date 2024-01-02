"use client"

import Link from "next/link"
import Image from "next/image"

import { formatearFecha, formatearPrecio } from "@/utils/funciones"
import { eliminarProductoDeLaLista } from "@/api/wishlist"
import { imagenURL } from "@/utils/variables"

import styles from "@/styles/productoEnLista.module.css"

function ProductoEnLista({ productoLista, tokenAcceso, recargar, setRecargar }) {

    const { id, attributes } = productoLista
    const { createdAt, producto } = attributes
    const { id: idProducto, attributes: attributesProducto } = producto.data
    const { titulo, precio, descripcion, slug, imagen } = attributesProducto
    const { url } = imagen.data.attributes

    const eliminarDeLista = async () => {
        await eliminarProductoDeLaLista(tokenAcceso, id)
        setRecargar(!recargar)
    }

    return (
        <div className={styles.producto}>
            <Image
                src={`${imagenURL}${url}`}
                alt="Imagen producto"
                width={100}
                height={50}
            />
            <div className={styles.contenido}>
                <h3>{titulo}</h3>
                <p className={styles.precio}>{formatearPrecio(precio)}</p>
                <p className={styles.fecha}>Se añadió el: {formatearFecha(createdAt)}</p>
            </div>
            <div className={styles.acciones}>
                <Link
                    href={`/producto/${slug}`}
                    className={styles.enlace}
                >Ver Producto</Link>
                <button
                    className={styles.botonEliminar}
                    onClick={eliminarDeLista}
                >Remover</button>
            </div>
        </div>
    )
}

export default ProductoEnLista