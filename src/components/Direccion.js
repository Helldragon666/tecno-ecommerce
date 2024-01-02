"use client"

import { useState } from "react"

import Image from "next/image"

import Modal from "./Modal"
import FormularioDireccion from "./FormularioDireccion"

import styles from "@/styles/direccion.module.css"
import { eliminarDirecion } from "@/api/direccion"

function Direccion({ direccion, usuario, tokenAcceso, recargar, setRecargar }) {

  const [editar, setEditar] = useState(false)

  const { id, attributes } = direccion
  const { titulo, calle, ciudad, estado, codigo_postal, telefono } = attributes

  async function handleBorrar() {

    const confirmado = confirm("¿Está seguro de borrar la dirección?")
    
    if (confirmado) {
      await eliminarDirecion(tokenAcceso, id)
      setRecargar(!recargar)
    }
  }

  return (
    <>
      <div className={styles.direccion}>
        <div>
          <h3>{titulo}</h3>
          <p className={styles.informacion}>
            {calle}, {ciudad}, {estado}, {codigo_postal}
          </p>
        </div>
        <div className={styles.acciones}>
          <button
            className={styles.boton}
            onClick={() => setEditar(!editar)}
          >
            <Image
              src="/edit.svg"
              width={20}
              height={15}
              alt="imagen editar"
            />
          </button>
          <button
            className={styles.boton}
            onClick={handleBorrar}
          >
            <Image
              src="/delete.svg"
              width={20}
              height={15}
              alt="imagen eliminar"
            />
          </button>
        </div>
      </div>
      {editar ? (
        <Modal
          modal={editar}
          setModal={setEditar}
          titulo="Editar dirección"
        >
          <FormularioDireccion
            modal={editar}
            setModal={setEditar}
            usuario={usuario}
            tokenAcceso={tokenAcceso}
            recargar={recargar}
            setRecargar={setRecargar}
            direccionId={id}
            direccion={attributes}
          />
        </Modal>
      ) : null}
    </>
  )
}

export default Direccion