"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import useAuth from "@/hooks/useAuth"
import useCarrito from "@/hooks/useCarrito"

import styles from "@/styles/cuenta.module.css"

function Cuenta() {

    const router = useRouter()

    const { usuario, cerrarSesion } = useAuth()
    const { total } = useCarrito()

    const irInicioSesion = () => router.push("unirme/iniciar-sesion")
    const irCuenta = () => router.push("/usuario")
    const irCarrito = () => router.push("/carrito?n=1")

    return (
        <div className={styles.cuenta}>
            {usuario && (
                <button
                    className={styles.carrito}
                    onClick={irCarrito}
                >
                    <Image
                        src="/carrito_compras.svg"
                        width={30}
                        height={15}
                        alt="imagen carrito de compras"
                    />
                    {total > 0 && <p>{total}</p>}
                </button>
            )}
            <button
                className={usuario ? styles.usuario : styles.inicio_sesion}
                onClick={usuario ? irCuenta : irInicioSesion}
            >
                <Image
                    src="/usuario.svg"
                    width={30}
                    height={15}
                    alt="imagen usuario"
                />
            </button>
            <button
                className={usuario ? styles.logout : styles.noMostrar}
                onClick={cerrarSesion}
            >
                <Image
                    src="/logout.svg"
                    width={30}
                    height={15}
                    alt="imagen usuario"
                />
            </button>
        </div>
    )
}

export default Cuenta