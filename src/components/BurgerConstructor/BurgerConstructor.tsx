import { useMemo, useEffect } from 'react';

import styles from './BurgerConstructor.module.css'
import pulseStyles from '../pulseStyles.module.css'

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import Modal from '../Modal/Modal'
import { useDrop } from 'react-dnd';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    CONSTRUCTOR_REORDER,
    DELETE_INGREDIENT,
    CLEAR_INGREDIENTS,
    CLOSE_ORDER,
} from '../../services/constants';

import { v4 as uuid } from 'uuid';
import PulseLoader from "react-spinners/PulseLoader";
import { sendOrder, setValue } from '../../services/actions/order';
import { OrderDetails } from '../Modal/OrderDetails';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/dispatch';
import { TIngredient } from '../../services/types/data';
import { TAnswer } from '../../services/reducers/order';

const BurgerConstructor: React.FC = () => {
    const bun = useAppSelector(state => state.constructorReducer.bun);
    const ingredients = useAppSelector(state => state.constructorReducer.ingredients);
    const order = useAppSelector(state => state.orderReducer);
    const answer = useAppSelector(state => state.orderReducer.answer);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    let orderValue: string[] = []

    useEffect(() => {
        bun && orderValue.push(bun._id)
        for (let i = 0; i < ingredients.length; i++) {
            orderValue.push(ingredients[i]._id)
        }
        bun && orderValue.push(bun._id)
    }, [bun, ingredients])
    
    const totalPrice = useMemo(() => (
        (bun ? bun.price * 2 : 0) +
        (ingredients.length ? ingredients.reduce((acc: number, item: TIngredient) => acc + item.price, 0) : 0))
        .toFixed(0),
    [ bun, ingredients ]);

    const [{isHoverTop}, dropBun] = useDrop({
        accept: 'bun',
        drop(data: TIngredient) {
            handleDropBun(data);
        },
        collect: monitor => ({
            isHoverTop: monitor.isOver(),
        })
    })

    const [{isHoverBottom}, dropBun1] = useDrop({
        accept: 'bun',
        drop(data: TIngredient) {
            handleDropBun(data);
        },
        collect: monitor => ({
            isHoverBottom: monitor.isOver(),
        })
    })

    const [{isHoverIngredient}, dropIngredient] = useDrop({
        accept: ['sauce', 'main'],
        drop(data: TIngredient) {
            handleDropIngredient(data);
        },
        collect: monitor => ({
            isHoverIngredient: monitor.isOver(),
        })
    })

    const handleDropBun = (data: TIngredient) => {
        dispatch({ type: ADD_BUN, payload: data })
    }

    const handleDropIngredient = (data: TIngredient) => {
        dispatch({ type: ADD_INGREDIENT, payload: { ...data, id: uuid() } })
    }

    const handleClose = (id: string) => {
        dispatch({ type: DELETE_INGREDIENT, payload: id })
    }

    const getOrderNumber = () => {
        if (localStorage.accessToken) {
            dispatch(setValue(orderValue))
            dispatch(sendOrder())
            dispatch({ type: CLEAR_INGREDIENTS })
        } else {
            navigate('/login')
        }
    }

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        dispatch({ type: CONSTRUCTOR_REORDER, dragIndex, hoverIndex})
    }

    const closeModal = () => {
        dispatch({ type: CLOSE_ORDER })
        orderValue = []
    }

    const modal = (order.orderRequest || (answer as TAnswer).order) && (
        <Modal onClose={closeModal}>
            {(answer as TAnswer).order ?
                <OrderDetails number={(answer as TAnswer).order.number}/>
                : <PulseLoader className={pulseStyles.pulse} color="#36d7b7"/> 
            }
        </Modal>
    ) 

    return (
        <div className={styles.wrapper}>
            <div className={styles.burgerConstructor}>
                <div className={styles.top} ref={dropBun} data-testid='constructor_top'>
                    {!bun && <div className={`${styles.head} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverBottom || isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }} >Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price as number}
                            thumbnail={bun.image as string}
                            extraClass='ml-8'
                        />
                    }
                </div>
                <div className={`${styles.inner} mt-4 mb-4`} ref={dropIngredient} data-testid='constructor_middle'>
                    {!ingredients.length && <div className={`${styles.body} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverIngredient ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }}>Выберите начинку</div> }
                    {ingredients.map((ingredient: TIngredient, index: number) =>
                        <ConstructorItemHolder
                            key={ingredient.id}
                            listIndex={index}
                            data={ingredient}
                            handleClose={() => handleClose(ingredient.id as string)}
                            index={index}
                            moveCard={moveCard}
                        />)
                    }
                </div>
                <div className={styles.bottom} ref={dropBun1} data-testid='constructor_bottom'>
                    {!bun && <div className={`${styles.foot} text text_type_main-default text_color_inactive`} style={{ boxShadow: isHoverBottom || isHoverTop ? '0 0 0 1px var(--colors-interface-accent) inset' : '' }}>Выберите булки</div> }
                    {bun &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price as number}
                            thumbnail={bun.image as string}
                            extraClass='ml-8'
                        />
                    }
                </div>
            </div>
            <div className={`${styles.order} mt-10`}>
                <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
                <CurrencyIcon type='primary' />
                <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={getOrderNumber} disabled={ bun ? false : true } data-testid='order_button'>Оформить заказ</Button>
                {modal}
            </div>
        </div>
        
    )
}

export default BurgerConstructor