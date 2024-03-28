import styles from './FeedItem.module.css'
import { IFeedOrder } from '../../services/reducers/wsFeed';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../utils/dispatch';
import { Link, useLocation } from 'react-router-dom';

type FIProps = {
    data: IFeedOrder,
}

const FeedItem: React.FC<FIProps> = ({ data }) => {
    const ingredients = useAppSelector(store => store.ingredientsReducer.ingredients)

    const location = useLocation()
    
    const itemPrice = data.ingredients
        .map(id => ingredients.filter(ingredient => ingredient._id == id))
        .reduce((acc, item) => acc + item[0].price, 0)

    return (
        <Link
            to={`/feed/${data.number}`}
            state={{ backgroundLocation: location }}
            className={styles.item}
        >
            <div className={styles.item_head}>
                <p className='text text_type_digits-default'>{`#${data.number.toString().padStart(6, '0')}`}</p>
                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(data.createdAt)} />
            </div>
            <p className='text text_type_main-medium'>{data.name}</p>
            <div className={styles.item_foot}>
                <ul className={styles.ul}>
                    {data.ingredients.map(id => ingredients.filter(ingredient => ingredient._id == id)).map((item, index) => 
                        <li key={index}>
                            <img className={styles.image} src={item[0].image_mobile} />
                            {index == 5 && 
                                <p className='text text_type_main-default'>+{data.ingredients.length - 5}</p>
                            }
                        </li>
                    )}
                </ul>
                <div className={styles.price}>
                    <p className='text text_type_digits-default'>{itemPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}

export default FeedItem