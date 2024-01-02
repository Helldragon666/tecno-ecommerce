import Link from "next/link"

import styles from "@/styles/confirmacion.module.css"

function Confirmacion() {
    return (
        <div className={styles.confirmacion}>
            <h3>!Su pedido se ha creado correctamente!</h3>
            <Link
                href="/usuario"
                className={styles.enlace}
            >Ver pedido</Link>
        </div>
    )
}

export default Confirmacion