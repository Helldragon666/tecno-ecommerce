"use client"

import { useFormik } from "formik"

import { valoresIniciales, validarObjeto } from "@/utils/validacionDireccion"
import { actualizarDireccion, crearDireccion } from "@/api/direccion"

import styles from "@/styles/formularioDireccion.module.css"

function FormularioDireccion({ modal, setModal, usuario, tokenAcceso, recargar, setRecargar, direccionId, direccion }) {

  const formik = useFormik({
    initialValues: valoresIniciales(direccion),
    validationSchema: validarObjeto(),
    validateOnChange: false,
    onSubmit: async valores => {

      if (direccionId) {
        await actualizarDireccion(tokenAcceso, direccionId, valores)
      } else {
        await crearDireccion(usuario.id, tokenAcceso, valores)
      }

      formik.handleReset()
      setRecargar(!recargar)
      setModal(!modal)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.grupo}>
        <div>
          {formik.touched.titulo && formik.errors.titulo ? (
            <div className={styles.alert}>{formik.errors.titulo}</div>
          ) : null}
          <input
            type="text"
            name="titulo"
            placeholder="Titulo de la dirección"
            className={`${styles.campo} ${formik.touched.titulo && formik.errors.titulo ? styles.error : ""}`}
            value={formik.values.titulo}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched.calle && formik.errors.calle ? (
            <div className={styles.alert}>{formik.errors.calle}</div>
          ) : null}
          <input
            type="text"
            name="calle"
            placeholder="Calle y número"
            className={`${styles.campo} ${formik.touched.calle && formik.errors.calle ? styles.error : ""}`}
            value={formik.values.calle}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched.ciudad && formik.errors.ciudad ? (
            <div className={styles.alert}>{formik.errors.ciudad}</div>
          ) : null}
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad o Municipio"
            className={`${styles.campo} ${formik.touched.ciudad && formik.errors.ciudad ? styles.error : ""}`}
            value={formik.values.ciudad}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched.estado && formik.errors.estado ? (
            <div className={styles.alert}>{formik.errors.estado}</div>
          ) : null}
          <input
            type="text"
            name="estado"
            placeholder="Estado"
            className={`${styles.campo} ${formik.touched.estado && formik.errors.estado ? styles.error : ""}`}
            value={formik.values.estado}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched.codigo_postal && formik.errors.codigo_postal ? (
            <div className={styles.alert}>{formik.errors.codigo_postal}</div>
          ) : null}
          <input
            type="text"
            name="codigo_postal"
            placeholder="Código Postal"
            className={`${styles.campo} ${formik.touched.codigo_postal && formik.errors.codigo_postal ? styles.error : ""}`}
            value={formik.values.codigo_postal}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {formik.touched.telefono && formik.errors.telefono ? (
            <div className={styles.alert}>{formik.errors.telefono}</div>
          ) : null}
          <input
            type="text"
            name="telefono"
            placeholder="Número de Teléfono"
            className={`${styles.campo} ${formik.touched.telefono && formik.errors.telefono ? styles.error : ""}`}
            value={formik.values.telefono}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <input type="submit" value="Enviar" className={styles.boton} />
    </form>
  )
}

export default FormularioDireccion