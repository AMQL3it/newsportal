import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ onClose, children, title, onSubmit }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span>{title}</span>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>
        <div className={styles.modalContent}>{children}</div>
        {/* <div className={styles.modalFooter}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onSubmit}>Submit</button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
