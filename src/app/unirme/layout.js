"use client"

import Link from "next/link"

import styles from "@/styles/unirme.module.css"

function UnirmeLayout({ children }) {

    return (
        <>
            <header className={styles.navegacion}>
                <Link href="/" className={styles.logo}>
                    Tecnoconsultores
                </Link>
            </header>
            <main className={styles.principal}>
                <div className={styles.bloqueIzquierdo}>{children}</div>
                <div className={styles.bloqueDerecho}></div>
            </main>
        </>
    )
}

export default UnirmeLayout