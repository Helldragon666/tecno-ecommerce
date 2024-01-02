import Header from "@/components/Header"
import { obtenerCategoriaPorSlug } from "@/api/categoria"
import Footer from "@/components/Footer"

export async function generateMetadata({ params }) {

    const { categoria } = params

    const { attributes } = await obtenerCategoriaPorSlug(categoria)

    return {
        title: `Tecnoconsultores - ${attributes.titulo}`,
        description: `Productos de la categoría ${attributes.titulo}`
    }
}

function CategoriaLayout({ children }) {
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

export default CategoriaLayout