import { useParams } from 'react-router-dom';
import styles from './feedOrderPage.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/dispatch';
import { FeedOrderDetails } from '../../components/Modal/FeedOrderDetails';
import { useEffect } from 'react';
import { getOrder } from '../../services/actions/getOrder';

export const FeedOrderPage: React.FC = () => {
    const data = useAppSelector(store => store.getOrderReducer.order)
    const dispatch = useAppDispatch()
    const feed_number = useParams().number

    useEffect(() => {
        dispatch(getOrder(feed_number))
    }, [])
      
    return (
        <div className={styles.page}>
            {data && <FeedOrderDetails fetchedData={data.orders[0]}/>}
        </div>
    );
}