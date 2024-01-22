import React from 'react';
import styles from './IngredientListItem.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productPropTypes } from '../../utils/prop-types'

function IngredientListItem({ data }) {
    return (
        <li className={ styles.item } draggable="true" >
            <img src={data.image_large} alt={data.name} />
            <div style={{ display: "flex" }}>
                <p className='text text_type_digits-default mr-2'>{data.price}</p>
                <CurrencyIcon />
            </div>
            <p className='text text_type_main-default' style={{ textAlign: "center" }}>{data.name}</p>
        </li>
    )
}

IngredientListItem.propTypes = {
    data: productPropTypes
}

export default IngredientListItem