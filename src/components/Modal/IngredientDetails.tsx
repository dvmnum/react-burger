import { TIngredient } from '../BurgerConstructor/BurgerConstructor'
import modalStyles from '../Modal/Modal.module.css'

const textMain = 'text text_type_main-default text_color_inactive'
const textDigits = 'text text_type_digits-default text_color_inactive'

type IDProps = {
    data: TIngredient
}

export const IngredientDetails: React.FC<IDProps> = ({data}) => {
    return (
        <>
          <img className={modalStyles.img} src={data.image_large as string} alt={data.name as string} />
            <p className={`${modalStyles.p} text text_type_main-medium`}>{data.name}</p>
            <ul className={modalStyles.ul}>
                <li className={modalStyles.li}>
                    <p className={textMain}>Калории, ккал</p>
                    <p className={textDigits}>{data.calories}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className={textMain}>Белки, г</p>
                    <p className={textDigits}>{data.proteins}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className={textMain}>Жиры, г</p>
                    <p className={textDigits}>{data.fat}</p>
                </li>
                <li className={modalStyles.li}>
                    <p className={textMain}>Углеводы, г</p>
                    <p className={textDigits}>{data.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}