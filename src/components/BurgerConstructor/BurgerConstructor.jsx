import styles from './BurgerConstructor.module.css'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import { productArrayPropTypes } from '../../utils/prop-types'

function BurgerConstructor({ src }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.constructor} data-constructor>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={src[0].image}
                    extraClass='ml-8'
                />
                <div className={`${styles.inner} mt-4 mb-4`}>
                    <ConstructorItemHolder data={src} />
                    <ConstructorItemHolder data={src} />
                    <ConstructorItemHolder data={src} />
                    <ConstructorItemHolder data={src} />
                    <ConstructorItemHolder data={src} />
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={src[0].image}
                    extraClass='ml-8'
                />
            </div>
            <div className={`${styles.order} mt-10`}>
                <p className='text text_type_digits-medium mr-2'>150</p>
                <CurrencyIcon />
                <Button htmlType="button" type="primary" size="large" extraClass='ml-10'>Оформить заказ</Button>
            </div>
        </div>
        
    )
}

BurgerConstructor.propTypes = {
    src: productArrayPropTypes
};


export default BurgerConstructor