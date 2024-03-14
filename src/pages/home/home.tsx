import styles from './home.module.css'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';


export const HomePage: React.FC = () => {

    return (
        <div className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    );
}
