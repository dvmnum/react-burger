import styles from './IngredientListItem.module.css'
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { productPropTypes } from '../../utils/prop-types'

import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

function IngredientListItem({ data, counter, counterValue, onClick }) {
    const { type } = data

    const location = useLocation()
    
    const [{ isDrag }, dragRef] = useDrag({
        type: type,
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
            onClick={onClick}
            ref={dragRef}
            style={{ opacity: isDrag ? 0.3 : 1 }}
        >
            <img src={data.image} alt={data.name} />
            <div className={ styles.listItem }>
                <p className='text text_type_digits-default mr-2'>{data.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
            {counter && counterValue > 0 &&
                <Counter count={counterValue} size="default" />
            }
        </Link>
    )
}

IngredientListItem.propTypes = {
    data: productPropTypes,
    counter: PropTypes.bool,
    counterValue: PropTypes.number,
    onClick: PropTypes.func.isRequired
}

export default IngredientListItem