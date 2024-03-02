import styles from './home.module.css'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor.jsx';


export const HomePage = () => {

    return (
        <div className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    );
}
