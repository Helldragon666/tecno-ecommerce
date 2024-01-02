import styles from "@/styles/modal.module.css"

function Modal({ modal, setModal, children, titulo }) {
  return (
    <div
      className={styles.overlay}
    >
      <div className={styles.contenidoModal}>
        <h3>{titulo}</h3>
        {children}
      </div>
      <button
        className={styles.btnCerrar}
        onClick={() => setModal(!modal)}
      >X</button>
    </div>
  )
}

export default Modal