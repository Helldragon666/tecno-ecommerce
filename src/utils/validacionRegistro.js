import * as Yup from "yup"

export function valoresIniciales() {
    return {
        email: "",
        username: "",
        nombre: "",
        password: ""
    }
}

export function validarObjeto() {
    return Yup.object({
        email: Yup.string().email("No es un correo válido").required("El correo es obligatorio"),
        username: Yup.string().required("El nombre de usuario es obligatorio"),
        nombre: Yup.string().required("El nombre es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria").min(6)
    })
}