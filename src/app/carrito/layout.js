import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
    title: "Tecnoconsultores - Carrito",
    description: 'Carrito de compras para visualizar los productos seleccionados antes de comprarlos',
}

function CarritoLayout({ children }) {
    return (
        <>
            <Header />
            <main className="contenedor separacion">{children}</main>
            <Footer />
        </>
    )
}

export default CarritoLayout