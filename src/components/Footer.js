import Link from "next/link"

import styles from "@/styles/footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`contenedor ${styles.contenido}`}>
                <Link href="/" className={styles.logo}>
                    Tecnoconsultores
                </Link>
                <p>Todos los derechos reservados {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer