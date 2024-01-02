import Header from "@/components/Header"
import Footer from "@/components/Footer"

export function generateMetadata({ params }) {

    const { idPedido } = params

    return {
        title: `Tecnoconsultores - Pedido ${idPedido}`,
        description: `Información del pedido ${idPedido} `
    }
}

function PedidoLayout({ children }) {
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

export default PedidoLayout