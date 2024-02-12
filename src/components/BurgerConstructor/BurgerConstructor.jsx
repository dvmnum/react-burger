import { useState, useMemo, useEffect, useCallback } from 'react';
import update from 'immutability-helper'

import styles from './BurgerConstructor.module.css'
import modalStyles from '../Modal/Modal.module.css'
import done from '../../images/done.svg'

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productArrayPropTypes } from '../../utils/prop-types'
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ADD_BUN, ADD_INGREDIENT, CONSTRUCTOR_REORDER, DELETE_INGREDIENT, SHAFFLE } from '../../services/actions/constructor';

import { v4 as uuid } from 'uuid';
import { getNumber, setValue } from '../../services/reducers/order';
import { CLEAR_INGREDIENTS, SET_INGREDIENTS } from '../../services/actions/order';

function BurgerConstructor() {
    const bun = useSelector(state => state.constructorReducer.bun);
    const ingredients = useSelector(state => state.constructorReducer.ingredients);
    const orderBody = useSelector(state => state.orderReducer);
    const answer = useSelector(state => state.orderReducer.answer);
    const dispatch = useDispatch();

    useEffect(() => {
        orderBody['ingredients'] = []
        bun && orderBody['ingredients'].push(bun._id)
        ingredients && orderBody['ingredients'].push(...ingredients.map(ingredient => ingredient._id))
        bun && orderBody['ingredients'].push(bun._id)
    }, [ bun, ingredients ] )
    
    const totalPrice = useMemo(() => (
        (bun ? bun.price * 2 : 0) +
        (ingredients.length ? ingredients.reduce((acc, item) => acc + item.price, 0) : 0))
        .toFixed(0),
    [ bun, ingredients ]);

    const [{isHoverTop}, dropBun] = useDrop({
        accept: 'bun',
        drop(data) {
            handleDropBun(data);
        },
        collect: monitor => ({
            isHoverTop: monitor.isOver(),
        })
    })

    const [{isHoverBottom}, dropBun1] = useDrop({
        accept: 'bun',
        drop(data) {
            handleDropBun(data);
        },
        collect: monitor => ({
            isHisHoverBottomover: monitor.isOver(),
        })
    })

    const [{isHoverIngredient}, dropIngredient] = useDrop({
        accept: ['sauce', 'main'],
        drop(data) {
            handleDropIngredient(data);
        },
        collect: monitor => ({
            isHoverIngredient: monitor.isOver(),
        })
    })

    const handleDropBun = (data) => {
        dispatch({ type: ADD_BUN, payload: data })
    }

    const handleDropIngredient = (data) => {
        dispatch({ type: ADD_INGREDIENT, payload: { ...data, id: uuid() } })
    }

    const handleClose = (id) => {
        dispatch({ type: DELETE_INGREDIENT, payload: id })
    }

    const getOrderNumber = () => {
        dispatch(setValue(orderBody['ingredients']))
        dispatch(getNumber(orderBody))
    }

    const closeModal = () => {
        dispatch({ type: CLEAR_INGREDIENTS })
    }

    const moveCard = (dragIndex, hoverIndex) => {
        dispatch({ type: CONSTRUCTOR_REORDER, dragIndex, hoverIndex})
    }

    const modal = answer.order && (
        <Modal close={closeModal}>
            <p className={`${modalStyles.big} text text_type_digits-large mb-8`}>{answer.order.number}</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img src={done} alt="done" className='mb-15 mt-15'/>
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    ) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.constructor}>
                <div className={styles.top} ref={dropBun}>
                    {!bun && <div className={`${styles.head} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }} >Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass='ml-8'
                        />
                    }
                </div>
                <div className={`${styles.inner} mt-4 mb-4`} ref={dropIngredient}>
                    {!ingredients.length && <div className={`${styles.body} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverIngredient ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }}>Выберите начинку</div> }
                    {ingredients.map((ingredient, index) =>
                        <ConstructorItemHolder
                            key={ingredient.id}
                            listIndex={index}
                            data={ingredient}
                            handleClose={() => handleClose(ingredient.id)}
                            index={index}
                            moveCard={moveCard}
                        />)
                    }
                </div>
                <div className={styles.bottom} ref={dropBun1}>
                    {!bun && <div className={`${styles.foot} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }}>Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass='ml-8'
                        />
                    }
                </div>
            </div>
            <div className={`${styles.order} mt-10`}>
                <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
                <CurrencyIcon />
                <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={getOrderNumber}>Оформить заказ</Button>
                {modal}
            </div>
        </div>
        
    )
}

// BurgerConstructor.propTypes = {
//     data: productArrayPropTypes
// };


export default BurgerConstructor