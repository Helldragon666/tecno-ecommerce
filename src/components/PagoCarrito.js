"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { v4 as uuidv4 } from "uuid"

import { obtenerDirecciones } from "@/api/direccion"
import useAuth from "@/hooks/useAuth"
import { formatearPrecio } from "@/utils/funciones"
import { crearPedido } from "@/api/pedidos"
import useCarrito from "@/hooks/useCarrito"

import styles from "@/styles/pagoCarrito.module.css"

function PagoCarrito({ productos, total }) {

    const [direcciones, setDirecciones] = useState([])
    const [direccionSeleccionada, setDireccionSeleccionada] = useState({})
    const [id, setId] = useState("")

    const router = useRouter()

    const { tokenAcceso, usuario } = useAuth()
    const { vaciarCarrito } = useCarrito()

    useEffect(() => {
        (async () => {
            const { data } = await obtenerDirecciones(tokenAcceso, usuario.id)
            setDirecciones(data)
            setId(uuidv4())
        })()
    }, [])

    const levantarPedido = async () => {

        const info = {
            usuario: usuario.id,
            idPago: id,
            slug: id,
            total,
            direccion: direccionSeleccionada,
            productos: productos.map(producto => {

                const { id, cantidad, attributes } = producto
                const { titulo, precio, categoria, imagen } = attributes
                const { titulo: tituloCat } = categoria.data.attributes
                const { url } = imagen.data.attributes

                return {
                    id,
                    cantidad,
                    titulo,
                    precio,
                    categoria: tituloCat,
                    imagen: url
                }
            })
        }

        await crearPedido(tokenAcceso, info)

        vaciarCarrito()

        router.replace("?n=3")
    }

    return (
        <section className={styles.seccionPago}>
            <div className={styles.ancho}>
                <h3>Selecciona tu dirección</h3>
                <div className={styles.direcciones}>{direcciones.map(direccion => (
                    <div
                        key={direccion.id}
                        className={`${styles.direccion} ${direccion.id === direccionSeleccionada.id ? styles.seleccionado : ""}`}
                        onClick={() => setDireccionSeleccionada(direccion)}
                    >
                        <h3>{direccion.attributes.titulo}</h3>
                        <p>
                            Calle: {direccion.attributes.calle}, Municipio: {direccion.attributes.ciudad},
                            C.P: {direccion.attributes.codigo_postal}, Estado: {direccion.attributes.estado}
                        </p>
                        <p>Teléfono: {direccion.attributes.telefono}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className={styles.resumen}>
                <h4>Resumen:</h4>
                <p className={styles.pago}>ID de pago: {id}</p>
                <div>
                    {productos.map(producto => (
                        <div
                            key={producto.id}
                            className={styles.producto}
                        >
                            <p>{producto.attributes.titulo}</p>
                            <p>{producto.cantidad} X {formatearPrecio(producto.attributes.precio)}</p>
                        </div>
                    ))}
                </div>
                <p className={styles.precio}>Total a pagar: {formatearPrecio(total)}</p>
                <button
                    className={`${styles.boton} ${Object.keys(direccionSeleccionada).length === 0 ? styles.deshabilitado : ""}`}
                    disabled={Object.keys(direccionSeleccionada).length === 0}
                    onClick={levantarPedido}
                >Comprar</button>
            </div>
        </section>
    )
}

export default PagoCarrito