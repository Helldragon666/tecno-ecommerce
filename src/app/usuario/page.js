"use client"

import Image from "next/image"

import useAuth from "@/hooks/useAuth"
import { formatearFecha } from "@/utils/funciones"
import Direcciones from "@/components/Direcciones"
import Wishlist from "@/components/Wishlist"
import Pedidos from "@/components/Pedidos"

import styles from "@/styles/usuario.module.css"

function Usuario() {

    const { usuario } = useAuth()

    return (
        <>
            <div className={styles.infoUsuario}>
                <button className={styles.usuario}>
                    <Image
                        src="/usuario.svg"
                        width={30}
                        height={15}
                        alt="imagen usuario"
                    />
                </button>
                <h3 className={styles.username}>{usuario?.username}</h3>
                <h4 className={styles.email}>{usuario?.email}</h4>
                <p className={styles.creado}>Miembro desde: {formatearFecha(usuario?.createdAt)}</p>
            </div>
            <section className="contenedor">
                <h2>Mis pedidos</h2>
                <Pedidos />
            </section>
            <section className="contenedor">
                <h2>Mis direcciones</h2>
                <Direcciones />
            </section>
            <section className="contenedor">
                <h2>Lista de deseos</h2>
                <Wishlist />
            </section>
        </>
    )
}

export default Usuario