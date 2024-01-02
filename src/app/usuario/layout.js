import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
    title: "Tecnoconsultores - Usuario",
    description: 'Información del usuario registrado en tecnoconsultores',
}

function UsuarioLayout({ children }) {
    return (
        <>
            <Header />
            <main className="separacion">{children}</main>
            <Footer />
        </>
    )
}

export default UsuarioLayout