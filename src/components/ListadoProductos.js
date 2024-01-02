"use client"

import Producto from "./Producto"

import styles from "@/styles/listadoProductos.module.css"

function ListadoProductos({ productos }) {

  return (
    <div className={styles.productos}>
      {productos && productos.map(producto => (
        <Producto
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  )
}

export default ListadoProductos