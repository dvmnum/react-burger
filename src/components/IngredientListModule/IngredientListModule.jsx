import styles from './IngredientListModule.module.css'

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

export default IngredientListModule