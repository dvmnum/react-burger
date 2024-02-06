import styles from './IngredientListModule.module.css'
import PropTypes from 'prop-types';

function IngredientListModule({ title, children }) {
    return (
        <div className='listElement'>
            <p className='text text_type_main-medium'>{title}</p>
            <ul className={styles.list}>
                {children}
            </ul>
        </div>
    )
}

IngredientListModule.propTypes = {
    title: PropTypes.string.isRequired
}

export default IngredientListModule