"use client"

import { createContext, useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { obtenerPerfil } from "@/api/usuario"
import { haExpirado } from "@/utils/funciones"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null)
    const [token, setToken] = useState(null)
    const [cargando, setCargando] = useState(true)

    const router = useRouter()

    useEffect(() => {
        (async () => {
            const tokenJWT = localStorage.getItem('token')

            if (!tokenJWT) {
                cerrarSesion()
                return setCargando(false)
            }

            if (haExpirado(tokenJWT)) {
                cerrarSesion()
            }

            await autenticarUsuario(tokenJWT)
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function autenticarUsuario(tokenJWT) {

        localStorage.setItem("token", tokenJWT)

        try {
            const respuesta = await obtenerPerfil(tokenJWT)
            setUsuario(respuesta)
            setToken(tokenJWT)
            setCargando(false)
        } catch (error) {
            console.error(error)
            setCargando(false)
        }
    }

    function cerrarSesion() {
        localStorage.removeItem("token")
        setUsuario(null)
        router.push("/")
    }

    function actualizarUsuario(llave, valor) {
        setUsuario({
            ...usuario,
            [llave]: valor
        })
    }

    const datos = {
        tokenAcceso: token,
        autenticarUsuario,
        usuario,
        cerrarSesion,
        actualizarUsuario,
    }

    if (cargando) {
        return null
    }

    return (
        <AuthContext.Provider
            value={
                datos
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext