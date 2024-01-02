"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { obtenerProductoPorSlug } from "@/api/producto"
import { agregarProductoALaLista, obtenerProductoEnLista, eliminarProductoDeLaLista } from "@/api/wishlist"
import { formatearPrecio } from "@/utils/funciones"
import useAuth from "@/hooks/useAuth"
import useCarrito from "@/hooks/useCarrito"
import { imagenURL } from "@/utils/variables"

import styles from "@/styles/productoPage.module.css"

function Producto({ params }) {

  const { nombre } = params

  const [producto, setProducto] = useState({})
  const [productoEnLista, setProductoEnLista] = useState({})

  const router = useRouter()

  const { tokenAcceso, usuario } = useAuth()
  const { agregarAlCarrito } = useCarrito()

  useEffect(() => {
    (async () => {

      const datos = await obtenerProductoPorSlug(nombre)
      setProducto(datos)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (usuario) {
        const valor = await obtenerProductoEnLista(tokenAcceso, usuario.id, producto.id)
        setProductoEnLista(valor)
      }
    })()
  }, [producto.id])

  if (Object.values(producto).length === 0) {
    return null
  }

  const { id, attributes } = producto
  const { titulo, precio, descuento, slug, descripcion, categoria, imagen } = attributes
  const { titulo: categoriaTitulo } = categoria.data.attributes
  const { url } = imagen.data.attributes

  const agregarALista = async () => {
    if (usuario) {
      const datosLista = await agregarProductoALaLista(tokenAcceso, usuario.id, id)
      setProductoEnLista(datosLista)
    } else {
      router.push("/unirme/iniciar-sesion")
    }
  }

  const eliminarDeLista = async () => {
    await eliminarProductoDeLaLista(tokenAcceso, productoEnLista?.id)
    setProductoEnLista({})
  }

  return (
    <div className={styles.producto}>
      <Image
        src={`${imagenURL}${url}`}
        alt="Imagen producto"
        width={250}
        height={150}
      />
      <div className={styles.contenido}>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
        <p className={styles.categoria}>Categoría: <span>{categoriaTitulo}</span></p>
        <p className={styles.precio}>Precio: <span>{formatearPrecio(precio)}</span></p>
        <button
          className={styles.boton}
          onClick={() => {
            if (usuario) {
              agregarAlCarrito(tokenAcceso, id)
            } else {
              router.push("/unirme/iniciar-sesion")
            }
          }}
        >Añadir al Carrito</button>
        <button
          className={`${styles.botonWish} ${Object.keys(productoEnLista).length !== 0 ? styles.enLista : ""}`}
          onClick={agregarALista}
          disabled={Object.keys(productoEnLista).length !== 0}
        >{Object.keys(productoEnLista).length !== 0 ? "Ya está en la lista" : "Agregar a la lista de deseos"}</button>
        {Object.keys(productoEnLista).length !== 0 ? (
          <button
            className={styles.botonEliminar}
            onClick={eliminarDeLista}
          >Quitar de la lista</button>
        ) : null}
      </div>
    </div>
  )
}

export default Producto