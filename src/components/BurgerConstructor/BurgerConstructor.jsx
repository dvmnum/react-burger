import { useState } from 'react';

import styles from './BurgerConstructor.module.css'
import modalStyles from '../Modal/Modal.module.css'
import done from '../../images/done.svg'

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productArrayPropTypes } from '../../utils/prop-types'
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import { AppContext } from '../../utils/appContext'
import Modal from '../Modal/Modal'

function BurgerConstructor({ src }) {
    const [ open, setOpen ] = useState(false)
    const [ data, setData ] = useState({
        buns: null,
        ingredients: []
    })

    const totalPrice = '0'
    // const totalPrice = useMemo(() => ((price - price * (discount / 100)) * qty).toFixed(0), [
    //     discount,
    //     price,
    //     qty
    // ]);

    const modal = (
        <Modal close={() => setOpen(false)}>
            <p className={`${modalStyles.big} text text_type_digits-large mb-8`}>034536</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img src={done} alt="done" className='mb-15 mt-15'/>
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    ) 

    return (
        <div className={styles.wrapper}>
            <AppContext.Provider value={{ data, setData }}>
                <div className={styles.constructor} data-constructor>
                    {/* <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={src[0].image}
                        extraClass='ml-8'
                    /> */}
                    <div className={`${styles.head} text text_type_main-default text_color_inactive`}>Выберите булки</div>
                    <div className={`${styles.inner} mt-4 mb-4`}>
                        {/* <ConstructorItemHolder data={src} />
                        <ConstructorItemHolder data={src} />
                        <ConstructorItemHolder data={src} />
                        <ConstructorItemHolder data={src} />
                        <ConstructorItemHolder data={src} /> */}
                        <div className={`${styles.body} text text_type_main-default text_color_inactive`}>Выберите начинку</div>
                    </div>
                    {/* <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={src[0].image}
                        extraClass='ml-8'
                    /> */}
                    <div className={`${styles.foot} text text_type_main-default text_color_inactive`}>Выберите булки</div>
                </div>
                <div className={`${styles.order} mt-10`}>
                    <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
                    <CurrencyIcon />
                    <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={() => setOpen(true)}>Оформить заказ</Button>
                    {open && modal}
                </div>
            </AppContext.Provider>
        </div>
        
    )
}

BurgerConstructor.propTypes = {
    src: productArrayPropTypes
};


export default BurgerConstructor