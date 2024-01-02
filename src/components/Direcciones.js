"use client"

import { useState } from "react"

import Modal from "./Modal"
import FormularioDireccion from "./FormularioDireccion"
import ListadoDirecciones from "./ListadoDirecciones"
import useAuth from "@/hooks/useAuth"

import styles from "@/styles/direcciones.module.css"

function Direcciones() {

    const [modal, setModal] = useState(false)
    const [recargar, setRecargar] = useState(false)

    const { usuario, tokenAcceso } = useAuth()

    return (
        <>
            {modal ? (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    titulo="Nueva dirección"
                >
                    <FormularioDireccion
                        modal={modal}
                        setModal={setModal}
                        usuario={usuario}
                        tokenAcceso={tokenAcceso}
                        recargar={recargar}
                        setRecargar={setRecargar}
                    />
                </Modal>
            ) : null}
            <div className={styles.contenido}>
                <button
                    className={styles.boton}
                    onClick={() => setModal(!modal)}
                >Crear dirección</button>
            </div>
            <ListadoDirecciones
                usuario={usuario}
                tokenAcceso={tokenAcceso}
                recargar={recargar}
                setRecargar={setRecargar}
            />
        </>
    )
}

export default Direcciones