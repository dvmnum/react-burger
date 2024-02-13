import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';
import { useEffect } from 'react';

const modalRoot = document.getElementById("modal");

function Modal({ children, title, onClose }) {

    useEffect(() => {
        const escFunction = (event) => {
            event.key === "Escape" && onClose()
        }

        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [])

    return createPortal(
        <ModalOverlay onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    {title &&
                        <p className='text text_type_main-large'>{title}</p>
                    }
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                <div className={styles.body}>
                    {children && children}
                </div>
            </div>
        </ModalOverlay>
        , modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
};


export default Modal