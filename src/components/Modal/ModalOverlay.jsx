import styles from './Modal.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ModalOverlay