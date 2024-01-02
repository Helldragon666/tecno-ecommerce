export const metadata = {
    title: 'Tecnoconsultores - Busqueda',
    description: 'Sección para buscar los productos de interes',
}

import Header from "@/components/Header"
import Footer from "@/components/Footer"

function BuscarLayout({ children }) {
    return (
        <>
            <Header />
            <main className="contenedor separacion">
                <h2>Resultados</h2>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default BuscarLayout