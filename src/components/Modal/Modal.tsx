import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';
import { ReactNode, useEffect } from 'react';

const modalRoot = document.getElementById("modal") as Element;

interface ModalProps {
    title?: string,
    onClose: () => void,
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {

    useEffect(() => {
        const escFunction = (e: KeyboardEvent) => {
            e.key === "Escape" && onClose()
        }

        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [])

    return createPortal(
        <ModalOverlay onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <CloseIcon type="primary" onClick={onClose}/>
                {title &&
                    <div className={styles.header}>
                        <p className='text text_type_main-large'>{title}</p>
                    </div>
                }
                <div className={styles.body}>
                    {children && children}
                </div>
            </div>
        </ModalOverlay>, 
        modalRoot
    )
}

export default Modal