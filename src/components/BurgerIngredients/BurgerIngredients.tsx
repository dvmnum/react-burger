import { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';

import IngredientListModule from '../IngredientListModule/IngredientListModule'
import IngredientListItem from '../IngredientListItem/IngredientListItem'
import { SET_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { TIngredient } from '../BurgerConstructor/BurgerConstructor';
import { useAppDispatch, useAppSelector } from '../../utils/dispatch';
import { useNavigate } from 'react-router-dom';

const BurgerIngredients: React.FC = () => {
    const data = useAppSelector(store => store.ingredientsReducer.ingredients)
    const addedBun = useAppSelector(store => store.constructorReducer.bun)
    const addedIngredients = useAppSelector(store => store.constructorReducer.ingredients)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [current, setCurrent] = useState('buns');

    const buns = useMemo(() => data.filter((product: TIngredient) => product.type === 'bun'), [data]);
    const mains = useMemo(() => data.filter((product: TIngredient) => product.type === 'main'), [data]);
    const sauces = useMemo(() => data.filter((product: TIngredient) => product.type === 'sauce'), [data]);
    
    const onscroll = (e: React.UIEvent<HTMLElement>) => {
        let parRect = (e.target as HTMLElement).getBoundingClientRect().top;

        (e.target as HTMLElement).childNodes.forEach((el: ChildNode, index: number) => {
            let elScroll = (el as HTMLElement).getBoundingClientRect().top + ((el as HTMLElement).clientHeight / 2) - parRect
            let nextEl = (e.target as HTMLElement).childNodes[index + 1]
            let nextElRect = nextEl && (nextEl as HTMLElement).getBoundingClientRect().top + ((nextEl as HTMLElement).clientHeight / 2) - parRect

            index === 0 && elScroll > 0 && setCurrent('buns')
            index === 0 && elScroll < 0 && nextElRect > 0 && setCurrent('sauces')
            index === 1 && elScroll < 0 && nextElRect > 0 && setCurrent('mains')
            index === 2 && elScroll < 0 && setCurrent('mains')
        })
    }

    return (
        <div className='mt-10'>
            <p className='text text_type_main-large mb-5'>Соберите бургер</p>
            <div className={`${styles.tabs} mb-10`}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.ingredientsList} onScroll={onscroll}>
                <IngredientListModule title='Булки'>
                    {buns.map((product: TIngredient, index: number) =>
                        <IngredientListItem
                            key={product._id}
                            data={product}
                            counter={addedBun && addedBun._id === product._id}
                            counterValue={2}
                        />
                    )}
                </IngredientListModule>
                <IngredientListModule title='Соусы'>
                    {sauces.map((product: TIngredient, index: number) =>
                        <IngredientListItem
                            key={product._id}
                            data={product}
                            counter={addedIngredients.length && addedIngredients.filter((item: TIngredient) => item._id === product._id) ? true : false}
                            counterValue={addedIngredients.length && addedIngredients.filter((item: TIngredient) => item._id === product._id).length}
                        />
                    )}
                </IngredientListModule>
                <IngredientListModule title='Начинки'>
                    {mains.map((product: TIngredient, index: number) =>
                        <IngredientListItem
                            key={product._id}
                            data={product}
                            counter={addedIngredients.length && addedIngredients.filter((item: TIngredient) => item._id === product._id) ? true : false}
                            counterValue={addedIngredients.length && addedIngredients.filter((item: TIngredient) => item._id === product._id).length}
                        />
                    )}
                </IngredientListModule>
            </div>
            {/* {modal} */}
        </div>
    );
}

export default BurgerIngredients