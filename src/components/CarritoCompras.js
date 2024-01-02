"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatearPrecio } from "@/utils/funciones";
import useCarrito from "@/hooks/useCarrito";
import { imagenURL } from "@/utils/variables";

import styles from "@/styles/carritoCompras.module.css"

function CarritoCompras({ productos }) {

    const router = useRouter()

    const { cambiarCantidad, eliminarItem } = useCarrito()

    return (
        <section className={`${styles.carritoCompras} ${productos.length === 0 && styles.espacio}`}>
            <h3>Carrito de Compras</h3>
            <div className={styles.contenido}>
                <div className={styles.listado}>
                    {productos.length !== 0 ? productos.map(producto => {

                        const { attributes } = producto
                        const { titulo, precio, imagen } = attributes
                        const { url } = imagen.data.attributes

                        return (
                            <div
                                key={producto.id}
                                className={styles.item}
                            >
                                <Image
                                    src={`${imagenURL}${url}`}
                                    alt="Imagen producto"
                                    width={100}
                                    height={50}
                                />
                                <div>
                                    <h5 className={styles.titulo}>{titulo}</h5>
                                    <p className={styles.precio}>Precio: {formatearPrecio(precio)}</p>
                                    <div className={styles.bloqueCantidad}>
                                        <p>Cantidad:</p>
                                        <select
                                            className={styles.selectCantidad}
                                            value={producto.cantidad}
                                            onChange={e => cambiarCantidad(producto.id, Number(e.target.value))}
                                        >
                                            <option value="1">1 pieza</option>
                                            <option value="2">2 piezas</option>
                                            <option value="3">3 piezas</option>
                                            <option value="4">4 piezas</option>
                                            <option value="5">5 piezas</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    className={styles.botonEliminar}
                                    onClick={() => eliminarItem(producto.id)}
                                >
                                    <Image
                                        src="/delete.svg"
                                        width={20}
                                        height={15}
                                        alt="imagen eliminar"
                                    />
                                </button>
                            </div>
                        )
                    }) : (<div>No hay productos en la cesta...</div>)}
                </div>
                <div>
                    <button
                        className={`
                            ${styles.boton} 
                            ${productos.length === 0 && styles.deshabilitado}
                        `}
                        onClick={() => router.replace("?n=2")}
                        disabled={productos.length === 0}
                    >Proceder con el pago</button>
                </div>
            </div>
        </section>
    )
}

export default CarritoCompras