import { useState } from 'react';
import styles from './IngredientListItem.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { productPropTypes } from '../../utils/prop-types'
import Modal from '../Modal/Modal'

import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { ModalInner } from '../ModalContent/ModalContent';

function IngredientListItem({ data, counter, counterValue }) {
    const { _id, type } = data
    const addedIngredient = useSelector(state => state.currentIngredientReducer.addedIngredient)
    
    const dispatch = useDispatch()

    const [{ isDrag }, dragRef] = useDrag({
        type: type,
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const openModal = (modalData) => {
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: modalData });
    }

    const closeModal = () => {
        dispatch({ type: REMOVE_CURRENT_INGREDIENT })
    }

    const modal = addedIngredient && (
        <Modal title='Детали ингредиента' close={closeModal}>
            <ModalInner data={addedIngredient} />
        </Modal>
    )

    return (
        <>
            <li className={ styles.item } onClick={() => openModal(data)} ref={dragRef} style={{ opacity: isDrag ? 0.3 : 1 }}>
                <img src={data.image} alt={data.name} />
                <div style={{ display: "flex" }}>
                    <p className='text text_type_digits-default mr-2'>{data.price}</p>
                    <CurrencyIcon />
                </div>
                <p className='text text_type_main-default' style={{ textAlign: "center" }}>{data.name}</p>
                {counter && counterValue > 0 &&
                    <Counter count={counterValue} size="default" />
                }
            </li>
            {modal}
        </>
    )
}

IngredientListItem.propTypes = {
    data: productPropTypes
}

export default IngredientListItem