import * as Yup from "yup"

export function valoresIniciales(direccion) {
    return {
        titulo: direccion?.titulo || "",
        calle: direccion?.calle || "",
        ciudad: direccion?.ciudad || "",
        estado: direccion?.estado || "",
        codigo_postal: direccion?.codigo_postal || "",
        telefono: direccion?.telefono || ""
    }
}

export function validarObjeto() {
    return Yup.object({
        titulo: Yup.string().required("El título es obligatorio"),
        calle: Yup.string().required("La calle es obligatoria"),
        ciudad: Yup.string().required("La ciudad es obligatoria"),
        estado: Yup.string().required("El estado es obligatorio"),
        codigo_postal: Yup.string().required("El código postal es obligatorio"),
        telefono: Yup.number().required("El teléfono es obligatorio"),
    })
}