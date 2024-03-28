import styles from '../Modal/Modal.module.css'
import { useAppSelector } from '../../utils/dispatch'
import { useParams } from 'react-router-dom'
import { IFeedOrder } from '../../services/reducers/wsFeed'
import { TIngredient } from '../../services/types/data'
import { v4 as uuid } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type FODProps = {
    drilledData?: any
}

export const FeedOrderDetails: React.FC<FODProps> = (drilledData) => {
    const feed = useAppSelector(store => store.wsReducer.feed)
    const ingredients = useAppSelector(store => store.ingredientsReducer.ingredients)

    let feed_number = useParams().number

    const data = !drilledData ? feed.orders && feed.orders.filter((item: IFeedOrder) => item.number.toString() === feed_number)[0] : drilledData.drilledData


    return data && (
        <>
            <p className={`text text_type_digits-default ${styles.feed_number}`}>{`#${(feed_number as string).toString().padStart(6, '0')}`}</p>
            <p className='text text_type_main-medium mt-10'>{data.name}</p>
            {data.status === 'done' ? 
                <p className={`text text_type_main-default mt-3 ${styles.done}`}>Выполнен</p> :
                <p className='text text_type_main-default mt-3'>Готовится</p>
            }
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
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
        </>
    )
}