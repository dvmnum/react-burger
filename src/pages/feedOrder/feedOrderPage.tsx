import { useParams } from 'react-router-dom';
import styles from './feedOrderPage.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/dispatch';
import { FeedOrderDetails } from '../../components/Modal/FeedOrderDetails';
import { useEffect } from 'react';
import { getOrder } from '../../services/actions/getOrder';

export const FeedOrderPage: React.FC = () => {
    const ingredients = useAppSelector(store => store.ingredientsReducer.ingredients)
    const data = useAppSelector(store => store.getOrderReducer.order)
    const dispatch = useAppDispatch()
    const feed_number = useParams().number

    useEffect(() => {
        dispatch(getOrder(feed_number))

    }, [])
    
    // const data = ingredients.filter((item: TIngredient) => item._id === _id)[0]
  
    return (
        <div className={styles.page}>
            {data && <FeedOrderDetails drilledData={data.orders[0]}/>}
        </div>
    );
}