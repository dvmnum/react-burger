import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import IngredientListModule from '../IngredientListModule/IngredientListModule'
import IngredientListItem from '../IngredientListItem/IngredientListItem'
import PropTypes from 'prop-types';


function BurgerIngredients({ src }) {
    const [current, setCurrent] = React.useState('one');
    
    return (
        <div className='burgerIngredients mt-10'>
            <p className='text text_type_main-large mb-5'>Соберите бургер</p>
            <div style={{ display: "flex" }} className='mb-10'>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>Булки</Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>Начинки</Tab>
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

export default BurgerIngredients