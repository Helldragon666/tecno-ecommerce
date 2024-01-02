import { jwtDecode } from "jwt-decode"

export function haExpirado(token) {
    
    const tokenDecoded = jwtDecode(token)
    const fechaExpiracion = tokenDecoded.exp * 1000
    const fechaActual = new Date().getTime()

    if (fechaActual > fechaExpiracion) {
        return true
    }

    return false
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }
    return fechaNueva.toLocaleDateString("es-ES", opciones)
}

export function formatearPrecio(precio) {
    const opciones = {
        style: 'currency',
        currency: 'MXN'
    }
    const precioNuevo = new Intl.NumberFormat("es-MX", opciones).format(precio)
    return precioNuevo
}