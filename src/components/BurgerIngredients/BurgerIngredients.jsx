import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import IngredientListModule from '../IngredientListModule/IngredientListModule'
import IngredientListItem from '../IngredientListItem/IngredientListItem'
import { productArrayPropTypes } from '../../utils/prop-types'


function BurgerIngredients({ src }) {
    const [current, setCurrent] = React.useState('buns');
    
    return (
        <div className='burgerIngredients mt-10'>
            <p className='text text_type_main-large mb-5'>Соберите бургер</p>
            <div style={{ display: "flex" }} className='mb-10'>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className={styles.ingredientsList} >
                <IngredientListModule title='Булки'>
                    {src.map((product, index) => product.type === 'bun' ? <IngredientListItem key={index} data={product} /> : null )}
                </IngredientListModule>
                <IngredientListModule title='Соусы'>
                    {src.map((product, index) => product.type === 'sauce' ? <IngredientListItem key={index} data={product} /> : null )}
                </IngredientListModule>
                <IngredientListModule title='Начинки'>
                    {src.map((product, index) => product.type === 'main' ? <IngredientListItem key={index} data={product} /> : null )}
                </IngredientListModule>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    src: productArrayPropTypes
};

export default BurgerIngredients