import styles from './IngredientListItem.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

type ILIProps = {
    data: TIngredient,
    counter: boolean | null,
    counterValue: number,
}

const IngredientListItem: React.FC<ILIProps> = ({ data, counter, counterValue }) => {
    const { type } = data

    const location = useLocation()
    
    const [{ isDrag }, dragRef] = useDrag({
        type: type as string,
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    
    return (
        <Link
            to={`/ingredients/${data._id}`}
            state={{ backgroundLocation: location }}
            className={ styles.item }
            ref={dragRef}
            style={{ opacity: isDrag ? 0.3 : 1 }}
        >
            <img src={data.image as string} alt={data.name as string} />
            <div className={ styles.listItem }>
                <p className='text text_type_digits-default mr-2'>{data.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
            {counter && counterValue > 0 &&
                <Counter count={counterValue} size="default" />
            }
        </Link>
    )
}

export default IngredientListItem