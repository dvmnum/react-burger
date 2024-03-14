import { ReactNode } from 'react';
import styles from './IngredientListModule.module.css'
import PropTypes from 'prop-types';

type ILMProps = {
    title: string,
    children: ReactNode
}

const IngredientListModule: React.FC<ILMProps> = ({ title, children }) => {
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
    title: PropTypes.string.isRequired,
    children: PropTypes.array
}

export default IngredientListModule