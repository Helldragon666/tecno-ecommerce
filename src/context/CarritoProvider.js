"use client"

import { createContext, useEffect, useState } from "react"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {

    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {

        //Obtener el carrito
        actualizarCarrito()
    }, [])

    function obtenerCarrito() {

        const respuesta = localStorage.getItem("carrito")

        if (!respuesta) {
            return []
        }

        return JSON.parse(respuesta)
    }

    function agregarAlCarrito(token, productoId) {

        const productos = obtenerCarrito()

        const objeto = {
            id: productoId,
            cantidad: 1,
        }

        const existe = productos.some(producto => producto.id === productoId)

        if (!existe) {
            productos.push(objeto)
            localStorage.setItem("carrito", JSON.stringify(productos))
        } else {

            const productosActualizados = productos.map(producto => {
                if (producto.id === productoId) {
                    producto.cantidad += 1
                    return producto
                }

                return producto
            })

            localStorage.setItem("carrito", JSON.stringify(productosActualizados))
        }

        actualizarCarrito()

    }

    function contarCantidadProductos() {

        const respuesta = obtenerCarrito()
        const cantidadTotal = respuesta.reduce((cantidadAcumulada, producto) => cantidadAcumulada + producto.cantidad, 0)

        return cantidadTotal
    }

    function actualizarCarrito() {
        setTotal(contarCantidadProductos())
        setCarrito(obtenerCarrito())
    }

    function cambiarCantidad(productoId, cantidad) {

        const productos = obtenerCarrito()

        const productosActualizados = productos.map(producto => {

            if (producto.id === productoId) {
                producto.cantidad = cantidad
                return producto
            }

            return producto
        })

        localStorage.setItem("carrito", JSON.stringify(productosActualizados))

        actualizarCarrito()
    }

    function eliminarItem(productoId) {

        const productos = obtenerCarrito()
        const productosActualizados = productos.filter(producto => producto.id !== productoId)
        localStorage.setItem("carrito", JSON.stringify(productosActualizados))
        actualizarCarrito()
    }

    function vaciarCarrito() {
        localStorage.removeItem("carrito")
        actualizarCarrito()
    }

    const datos = {
        carrito,
        agregarAlCarrito,
        total,
        eliminarItem,
        vaciarCarrito,
        cambiarCantidad
    }

    return (
        <CarritoContext.Provider
            value={datos}
        >
            {children}
        </CarritoContext.Provider>
    )
}

export default CarritoContext