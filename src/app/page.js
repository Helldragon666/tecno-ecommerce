"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { obtenerCategorias } from "@/api/categoria"
import { obtenerUltimosProductos } from "@/api/producto"
import Header from "@/components/Header"
import UltimoProducto from "@/components/UltimoProducto"
import ListadoProductos from "@/components/ListadoProductos"
import Footer from "@/components/Footer"

import styles from "@/styles/home.module.css"

export default function Home() {

  const [categorias, setCategorias] = useState([])

  const [productos, setproductos] = useState([])

  useEffect(() => {
    (
      async () => {
        const [{ data: cat }, { data: prod }] = await Promise.all([obtenerCategorias(), obtenerUltimosProductos({ limite: 9, categoriaId: null })])

        setCategorias(cat)
        setproductos(prod)
      }
    )()
  }, [])

  return (
    <>
      <Header />
      <main className={`contenedor ${styles.principal}`}>

        <aside className={styles.categorias}>
          <h2>Categorías</h2>
          {categorias.map(categoria => (
            <Link
              key={categoria.id}
              href={`/productos/${categoria.attributes.slug}`}
            >{categoria.attributes.titulo}</Link>
          ))}
        </aside>
        <div><UltimoProducto /></div>
      </main>
      <section className={`contenedor ${styles.separacion}`}>
        <h2>Agregados Recientemente</h2>
        <ListadoProductos productos={productos} />
      </section>
      <Footer />
    </>
  )
}
