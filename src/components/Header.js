"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import Cuenta from "./Cuenta"

import styles from "@/styles/header.module.css"

function Header() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = e => {

    e.preventDefault()
    router.push(`/buscar?b=${e.target[0].value}`)
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Tecnoconsultores
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.buscador}
          placeholder="Buscar"
          defaultValue={searchParams.get("b") || ""}
        />
        <button
          type="submit"
          className={styles.botonBuscar}
        >
          <Image
            src="/search.svg"
            alt="imagen busqueda"
            width={20}
            height={10}
          />
        </button>
      </form>
      <div className={styles.usuario}><Cuenta /></div>
    </header>
  )
}

export default Header