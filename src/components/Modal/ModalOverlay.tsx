import { ReactNode } from 'react';
import styles from './Modal.module.css'

type MOProps = {
    children: ReactNode,
    onClick: () => void
}

const ModalOverlay: React.FC<MOProps> = ({ children, onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    )
}

export default ModalOverlay