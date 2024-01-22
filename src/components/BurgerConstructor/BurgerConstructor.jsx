import styles from './BurgerConstructor.module.css'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItemHolder from '../ConstructorItemHolder/ConstructorItemHolder'
import PropTypes from 'prop-types';

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
    src: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })).isRequired,
};


export default BurgerConstructor