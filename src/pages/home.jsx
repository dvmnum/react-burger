import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from '../services/actions/ingredients';

import styles from './home.module.css'
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor.jsx';


export const HomePage = () => {

    return (
        <div className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    );
}
