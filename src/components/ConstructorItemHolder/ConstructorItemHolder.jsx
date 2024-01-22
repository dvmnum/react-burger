import styles from './ConstructorItemHolder.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorItemHolder({ data }) {
    return (
        <div className={styles.holder}>
            <DragIcon type="primary" />
            <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].image}
            extraClass='ml-2'
        />
        </div>
        
               
    )
}

export default ConstructorItemHolder