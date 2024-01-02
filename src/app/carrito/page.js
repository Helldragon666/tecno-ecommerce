"use client"

import { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import useCarrito from "@/hooks/useCarrito"
import { obtenerProductoPorId } from "@/api/producto"
import CarritoCompras from "@/components/CarritoCompras"
import PagoCarrito from "@/components/PagoCarrito"
import Confirmacion from "@/components/Confirmacion"

import styles from "@/styles/carritoPage.module.css"

function Carrito() {

  const [productos, setProductos] = useState([])
  const [total, setTotal] = useState(0)

  const n = useSearchParams().get("n")

  const pasos = [
    { numero: "1", titulo: "Cesta" },
    { numero: "2", titulo: "Pago" },
    { numero: "3", titulo: "Confirmación" },
  ]

  const { carrito } = useCarrito()

  useEffect(() => {

    (async () => {

      const productosPrometidos = carrito.map(async ({ id, cantidad }) => {

        const producto = await obtenerProductoPorId(id)

        return { ...producto, cantidad }
      })

      const productosObtenidos = await Promise.all(productosPrometidos)
      setProductos(productosObtenidos)

    })()
  }, [carrito])

  useEffect(() => {
    const totalPagar = productos.reduce((totalAcumulado, producto) => totalAcumulado + (producto.attributes.precio * producto.cantidad), 0)
    setTotal(totalPagar)
  }, [productos])

  return (
    <div>
      <div className={styles.pasos}>{pasos.map(paso => (
        <div key={paso.numero} className={styles.paso}>
          <h2 className={paso.numero === n ? styles.activo : ""}>{`${paso.numero} ${paso.titulo}`}</h2>
        </div>
      ))}
      </div>

      {n === "1" && <CarritoCompras productos={productos} />}
      {n === "2" && <PagoCarrito productos={productos} total={total} />}
      {n === "3" && <Confirmacion />}
    </div>
  )
}

export default Carrito