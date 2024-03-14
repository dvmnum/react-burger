import { useNavigate, useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/Modal/IngredientDetails';
import styles from './ingredient.module.css'
import { useSelector } from 'react-redux';
import { TIngredient } from '../../components/BurgerConstructor/BurgerConstructor';

export const IngredientDetailPage: React.FC = () => {
    const ingredients = useSelector((state: any) => state.ingredientsReducer.ingredients)

    let _id = useParams().id
    
    const data = ingredients.filter((item: TIngredient) => item._id === _id)[0]
  
    return (
        <div className={styles.page}>
            {data && <IngredientDetails data={data}/>}
        </div>
    );
}