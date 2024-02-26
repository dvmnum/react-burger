import { productPropTypes } from '../../utils/prop-types'
import modalStyles from '../Modal/Modal.module.css'

const textMain = 'text text_type_main-default text_color_inactive'
const textDigits = 'text text_type_digits-default text_color_inactive'

export const IngredientDetails = ({data}) => {
    return (
        <>
          <img className={modalStyles.img} src={data.image_large} alt={data.name} />
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

IngredientDetails.propTypes = {
    data: productPropTypes
}