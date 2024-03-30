import styles from '../Modal/Modal.module.css'
import { useAppSelector } from '../../utils/dispatch'
import { useParams } from 'react-router-dom'
import { IFeedOrder, TIngredient } from '../../services/types/data'
import { v4 as uuid } from 'uuid';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

type FODProps = {
    drilledData?: any
}

export const FeedOrderUserDetails: React.FC<FODProps> = (drilledData) => {
    const { status, feed } = useAppSelector(store => store.wsFeedUserReducer)
    const ingredients = useAppSelector(store => store.ingredientsReducer.ingredients)

    let feed_number = useParams().number

    const data = !drilledData.drilledData && feed !== null ? feed.orders && feed.orders.filter((item: IFeedOrder) => item.number.toString() === feed_number)[0] : drilledData.drilledData

    const itemPrice = data && data.ingredients
        .map((id: string) => ingredients.filter(ingredient => ingredient._id == id))
        .reduce((acc: number, item: TIngredient[]) => acc + item[0].price, 0)

    return data && (
        <>
            <p className={`text text_type_digits-default ${styles.feed_number}`}>{`#${(feed_number as string).toString().padStart(6, '0')}`}</p>
            <p className={`text text_type_main-medium mt-10 ${styles.order_text}`}>{data.name}</p>
            {data.status === 'done' ? 
                <p className={`text text_type_main-default mt-3 ${styles.done} ${styles.order_text}`}>Выполнен</p> :
                <p className='text text_type_main-default mt-3'>Готовится</p>
            }
            <p className={`text text_type_main-medium mt-15 mb-6 ${styles.order_text}`}>Состав:</p>
            <ul className={styles.feed_ul}>
            {data.ingredients
                .filter((value: string, index: number, array: string[]) => array.indexOf(value) === index)
                .map((id: string) => ingredients.filter(ingredient => ingredient._id == id))
                .map((item: TIngredient[]) => 
                <li key={uuid()} className={styles.feed_li}>
                    <img className={styles.feed_image} src={item[0].image_mobile} />
                    <p className='text text_type_main-default'>{item[0].name}</p>
                    <div className={styles.feed_li_price}>
                        <p className='text text_type_digits-default'>{data.ingredients.filter((matchId: string) => matchId == item[0]._id).length} x {item[0].price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </li>
            )}
            </ul>
            <div className={`mt-10 ${styles.order_bottom}`}>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(data.createdAt)} />
                <div className={styles.order_price}>
                    <p className='text text_type_digits-default'>{itemPrice}</p>
                    <CurrencyIcon type="primary" />
                </div> 
            </div>
        </>
    )
}


