import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalOverlay from './ModalOverlay';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const modalRoot = document.getElementById("modal");

function Modal({ children, title, action }) {
    const dispatch = useDispatch()

    const overlayHandler = (e) => {
        dispatch({ type: action })
    }

    const closeModal = () => {
        dispatch({ type: action })
    }

    useEffect(() => {
        const escFunction = (event) => {
            event.key === "Escape" && dispatch({ type: action })
        }

        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [action, dispatch])
    
    return createPortal(
        <ModalOverlay onClick={overlayHandler}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    {title &&
                        <p className='text text_type_main-large'>{title}</p>
                    }
                    <CloseIcon type="primary" onClick={closeModal}/>
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
    action: PropTypes.string.isRequired
};


export default Modal