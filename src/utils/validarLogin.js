import * as Yup from "yup"

export function valoresIniciales() {
    return {
        identifier: "",
        password: ""
    }
}

export function validarObjeto() {
    return Yup.object({
        identifier: Yup.string().required("El correo o nombre de usuario es obligario"),
        password: Yup.string().required("La contraseña es obligatoria").min(6)
    })
}