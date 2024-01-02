import Header from "@/components/Header"
import { obtenerProductoPorSlug } from "@/api/producto"
import Footer from "@/components/Footer"

export async function generateMetadata({ params }) {

    const { nombre } = params

    const { attributes } = await obtenerProductoPorSlug(nombre)

    return {
        title: `Tecnoconsultores - ${attributes.titulo}`,
        description: `Información del producto ${attributes.titulo}`
    }
}

function ProductoLayout({ children }) {
    return (
        <>
            <Header />
            <main className="contenedor separacion">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default ProductoLayout