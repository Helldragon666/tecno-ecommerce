import Image from "next/image"
import Link from "next/link"

import { formatearPrecio } from "@/utils/funciones"
import { imagenURL } from "@/utils/variables"

import styles from "@/styles/producto.module.css"

function Producto({ producto }) {

    const { id, attributes } = producto

    const { titulo, descripcion, precio, slug, imagen, categoria } = attributes
    const { url } = imagen.data.attributes

    return (
        <div className={styles.producto}>
            <Image
                src={`${imagenURL}${url}`}
                alt="Imagen producto"
                width={100}
                height={50}
            />
            <div className={styles.informacion}>
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
                <p className={styles.precio}>{formatearPrecio(precio)}</p>
                <Link
                    href={`/producto/${slug}`}
                    className={styles.enlace}
                >Ver Producto</Link>
            </div>
        </div>
    )
}

export default Producto