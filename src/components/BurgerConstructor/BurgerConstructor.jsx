import { useMemo, useEffect } from 'react';

import styles from './BurgerConstructor.module.css'
import pulseStyles from '../pulseStyles.module.css'

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_BUN, ADD_INGREDIENT, CONSTRUCTOR_REORDER, DELETE_INGREDIENT, CLEAR_INGREDIENTS } from '../../services/actions/constructor';

import { v4 as uuid } from 'uuid';
import PulseLoader from "react-spinners/PulseLoader";
import { sendOrder, setValue } from '../../services/actions/order';
import { CLOSE_ORDER } from '../../services/actions/order';
import { OrderDetails } from '../Modal/OrderDetails';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor() {
    const bun = useSelector(state => state.constructorReducer.bun);
    const ingredients = useSelector(state => state.constructorReducer.ingredients);
    const order = useSelector(state => state.orderReducer);
    const answer = useSelector(state => state.orderReducer.answer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        order['ingredients'] = []
        bun && order['ingredients'].push(bun._id)
        ingredients && order['ingredients'].push(...ingredients.map(ingredient => ingredient._id))
        bun && order['ingredients'].push(bun._id)
    }, [ bun, ingredients, order ] )
    
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
            isHoverBottom: monitor.isOver(),
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
        if (localStorage.accessToken) {
            dispatch(setValue(order['ingredients']))
            dispatch(sendOrder(order))
            dispatch({ type: CLEAR_INGREDIENTS })
        } else {
            navigate('/login')
        }
    }

    const moveCard = (dragIndex, hoverIndex) => {
        dispatch({ type: CONSTRUCTOR_REORDER, dragIndex, hoverIndex})
    }

    const closeModal = () => {
        dispatch({ type: CLOSE_ORDER })
    }

    const modal = (order.orderRequest || answer.order) && (
        <Modal onClose={closeModal}>
            {answer.order ?
                <OrderDetails number={answer.order.number}/>
                : <PulseLoader className={pulseStyles.pulse} color="#36d7b7"/> 
            }
        </Modal>
    ) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.constructor}>
                <div className={styles.top} ref={dropBun}>
                    {!bun && <div className={`${styles.head} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverBottom || isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }} >Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
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
                    {!bun && <div className={`${styles.foot} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverBottom || isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }}>Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
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
                <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={getOrderNumber} disabled={ bun ? false : true }>Оформить заказ</Button>
                {modal}
            </div>
        </div>
        
    )
}

export default BurgerConstructor