"use client"

import { useState, useEffect } from "react"

import { obtenerDirecciones } from "@/api/direccion"
import Direccion from "./Direccion"

import styles from "@/styles/listadoDirecciones.module.css"

function ListadoDirecciones({ usuario, tokenAcceso, recargar, setRecargar }) {

    const [direcciones, setDirecciones] = useState([])

    useEffect(() => {

        (async () => {
            const { data } = await obtenerDirecciones(tokenAcceso, usuario.id)
            setDirecciones(data)
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recargar])

    return (
        <div className={styles.direcciones}>
            {direcciones.length === 0 ? (
                <div>No tienes direcciones, comienza creando una</div>
            ) : direcciones.map(direccion => (
                <Direccion
                    key={direccion.id}
                    direccion={direccion}
                    usuario={usuario}
                    tokenAcceso={tokenAcceso}
                    recargar={recargar}
                    setRecargar={setRecargar}
                />
            ))}
        </div>
    )
}

export default ListadoDirecciones