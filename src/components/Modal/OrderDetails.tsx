import modalStyles from '../Modal/Modal.module.css'
import done from '../../images/done.svg'

type ODProps = {
    number: number
}

export const OrderDetails: React.FC<ODProps> = ({ number }) => {
    return (
        <>
            <p className={`${modalStyles.big} text text_type_digits-large mb-8`}>{ number }</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img src={done} alt="done" className='mb-15 mt-15'/>
            <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}