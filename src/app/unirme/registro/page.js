"use client"

import { useState } from "react";

import Link from "next/link"
import { useRouter } from "next/navigation";

import { useFormik } from "formik";

import { validarObjeto, valoresIniciales } from "@/utils/validacionRegistro";
import { registrarUsuario } from "@/api/usuario";

import styles from "@/styles/registro.module.css"

function Registro() {

  const router = useRouter()

  const [mensajeError, setMensajeError] = useState("")

  const formik = useFormik({
    initialValues: valoresIniciales(),
    validationSchema: validarObjeto(),
    validateOnChange: false,
    onSubmit: async valores => {
      const respuesta = await registrarUsuario(valores)
      if (!respuesta.jwt) {
        return setMensajeError(respuesta.error.message)
      }
      router.push("iniciar-sesion")
    }
  })

  return (
    <div className={styles.registro}>
      <h3>Crear Cuenta</h3>

      <div>
        {mensajeError ? (
          <div className={styles.alert}>{mensajeError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.grupo}>
            <div>
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.alert}>{formik.errors.email}</div>
              ) : null}
              <input
                className={`${styles.campo} ${formik.touched.email && formik.errors.email ? styles.error : ""}`}
                name="email"
                type="text"
                placeholder="Correo Electrónico"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.touched.username && formik.errors.username ? (
                <div className={styles.alert}>{formik.errors.username}</div>
              ) : null}
              <input
                className={`${styles.campo} ${formik.touched.username && formik.errors.username ? styles.error : ""}`}
                name="username"
                type="text"
                placeholder="Nombre de Usuario"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className={styles.alert}>{formik.errors.nombre}</div>
              ) : null}
              <input
                className={`${styles.campo} ${formik.touched.nombre && formik.errors.nombre ? styles.error : ""}`}
                name="nombre"
                type="text"
                placeholder="Nombre Completo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              {formik.touched.password && formik.errors.password ? (
                <div className={styles.alert}>{formik.errors.password}</div>
              ) : null}
              <input
                className={`${styles.campo} ${formik.touched.password && formik.errors.password ? styles.error : ""}`}
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <input className={styles.boton} type="submit" value="Registrarse" />
        </form>
      </div>

      <div className={styles.acciones}>
        <Link href="/unirme/iniciar-sesion">Atras</Link>
      </div>
    </div>
  )
}

export default Registro