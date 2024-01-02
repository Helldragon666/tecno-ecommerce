"use client"

import { useState } from "react";

import Link from "next/link"
import { useRouter } from "next/navigation";

import { useFormik } from "formik";

import { validarObjeto, valoresIniciales } from "@/utils/validarLogin";
import { iniciarSesion } from "@/api/usuario";
import useAuth from "@/hooks/useAuth";

import styles from "@/styles/inicioSesion.module.css"

function IniciarSesion() {

  const router = useRouter()

  const [mensajeError, setMensajeError] = useState("")

  const { autenticarUsuario } = useAuth()

  const formik = useFormik({
    initialValues: valoresIniciales(),
    validationSchema: validarObjeto(),
    validateOnChange: false,
    onSubmit: async valores => {
      const datos = await iniciarSesion(valores)
      if (!datos.jwt) {
        return setMensajeError(datos.error.message)
      }
      autenticarUsuario(datos.jwt)
      router.push("/")
    }
  })

  return (
    <div className={styles.inicio}>
      <h3>Iniciar Sesión</h3>

      <div>
        {mensajeError !== "" ? (
          <div className={styles.alert}>{mensajeError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div>
            {formik.touched.identifier && formik.errors.identifier ? (
              <div className={styles.alert}>{formik.errors.identifier}</div>
            ) : null}
            <input
              className={`${styles.campo} ${formik.touched.identifier && formik.errors.identifier ? styles.error : ""}`}
              name="identifier"
              type="text"
              placeholder="Correo Electrónico o nombre de usuario"
              value={formik.values.identifier}
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
          <input className={styles.boton} type="submit" value="Entrar" />
        </form>
      </div>

      <div className={styles.acciones}>
        <Link href="/unirme/registro">¿No tienes una cuenta?</Link>
      </div>
    </div>
  )
}

export default IniciarSesion