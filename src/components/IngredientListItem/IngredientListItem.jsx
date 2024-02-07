import { useState } from 'react';
import styles from './IngredientListItem.module.css'
import modalStyles from '../Modal/Modal.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productPropTypes } from '../../utils/prop-types'
import Modal from '../Modal/Modal'

import { useDrag } from 'react-dnd';

function IngredientListItem({ data }) {
    const [ open, setOpen ] = useState(false)

    const [, dragRef] = useDrag({
        type: 'product',
        item: data._id,
    });

    const modal = (
        <Modal title='Детали ингредиента' close={() => setOpen(false)}>
            <img className={modalStyles.img} src={data.image_large} alt={data.name} />
            <p className={`${modalStyles.p} text text_type_main-medium`}>{data.name}</p>
            <ul className={modalStyles.ul}>
                <li className={modalStyles.li}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{data.calories}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{data.proteins}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{data.fat}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{data.carbohydrates}</p>
                </li>
            </ul>
        </Modal>
    )

    return (
        <>
            <li className={ styles.item } onClick={() => setOpen(true)} ref={dragRef}>
                <img src={data.image} alt={data.name} />
                <div style={{ display: "flex" }}>
                    <p className='text text_type_digits-default mr-2'>{data.price}</p>
                    <CurrencyIcon />
                </div>
                <p className='text text_type_main-default' style={{ textAlign: "center" }}>{data.name}</p>
            </li>
            {open && modal}
        </>
    )
}

IngredientListItem.propTypes = {
    data: productPropTypes
}

export default IngredientListItem