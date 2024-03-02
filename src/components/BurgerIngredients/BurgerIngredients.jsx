import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';

import IngredientListModule from '../IngredientListModule/IngredientListModule'
import IngredientListItem from '../IngredientListItem/IngredientListItem'
import { SET_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';

function BurgerIngredients() {
    const data = useSelector(state => state.ingredientsReducer.ingredients)
    const addedBun = useSelector(state => state.constructorReducer.bun)
    const addedIngredients = useSelector(state => state.constructorReducer.ingredients)
    const dispatch = useDispatch()

    const [current, setCurrent] = useState('buns');

    const buns = useMemo(() => data.filter((product) => product.type === 'bun'), [data]);
    const mains = useMemo(() => data.filter((product) => product.type === 'main'), [data]);
    const sauces = useMemo(() => data.filter((product) => product.type === 'sauce'), [data]);
    
    const onscroll = (e) => {
        let parRect = e.target.getBoundingClientRect().top

        e.target.childNodes.forEach((el, index) => {
            let elScroll = el.getBoundingClientRect().top + (el.clientHeight / 2) - parRect
            let nextEl = e.target.childNodes[index + 1]
            let nextElRect = nextEl && nextEl.getBoundingClientRect().top + (nextEl.clientHeight / 2) - parRect

            index === 0 && elScroll > 0 && setCurrent('buns')
            index === 0 && elScroll < 0 && nextElRect > 0 && setCurrent('sauces')
            index === 1 && elScroll < 0 && nextElRect > 0 && setCurrent('mains')
            index === 2 && elScroll < 0 && setCurrent('mains')
        })
    }

    const openModal = (modalData) => {
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: modalData });
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
                    {buns.map((product, index) =>

                            <IngredientListItem
                                key={product._id}
                                data={product}
                                counter={addedBun && addedBun._id === product._id}
                                counterValue={2}
                                onClick={() => openModal(product)}
                            />
                        )
                    }
                </IngredientListModule>
                <IngredientListModule title='Соусы'>
                    {sauces.map((product, index) =>
                        
                            <IngredientListItem
                                key={product._id}
                                data={product}
                                counter={addedIngredients.length && addedIngredients.filter((item) => item._id === product._id) ? true : false}
                                counterValue={addedIngredients.length && addedIngredients.filter((item) => item._id === product._id).length}
                                onClick={() => openModal(product)}
                            />
                        )
                    }
                </IngredientListModule>
                <IngredientListModule title='Начинки'>
                    {mains.map((product, index) =>

                            <IngredientListItem
                                key={product._id}
                                data={product}
                                counter={addedIngredients.length && addedIngredients.filter((item) => item._id === product._id) ? true : false}
                                counterValue={addedIngredients.length && addedIngredients.filter((item) => item._id === product._id).length}
                                onClick={() => openModal(product)}
                            />
                    )
                    }
                </IngredientListModule>
            </div>
            {/* {modal} */}
        </div>
    );
}

export default BurgerIngredients