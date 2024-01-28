import styles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ReactDOM, { createPortal } from 'react-dom';
import React, { useEffect, useMemo } from 'react';

const modalRoot = document.getElementById("modal");

function Modal({ children, close, title }) {

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [])

    function escFunction(event) {
        if (event.key === "Escape") {
            close(true)
        }
    }

    return createPortal(
            <div className={styles.overlay} onClick={close}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        {title &&
                            <p className='text text_type_main-large'>{title}</p>
                        }
                        <CloseIcon type="primary" onClick={close}/>
                    </div>
                    <div className={styles.body}>
                        {children && children}
                    </div>
                </div>
            </div>
        , modalRoot
    )
}

Modal.propTypes = {
    cildren: PropTypes.element,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.bool.isRequired,
    title: PropTypes.string
};


export default Modal