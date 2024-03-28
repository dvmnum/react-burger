import { useEffect } from 'react'
import styles from './feed.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/dispatch'
import { WS_GET_MESSAGE } from '../../services/constants'
import FeedItem from '../../components/FeedItem/FeedItem'
import { IFeedOrder } from '../../services/reducers/wsFeed'
import { v4 as uuid } from 'uuid';

export const FeedPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const feed = useAppSelector(store => store.wsReducer.feed)

    useEffect(() => {
        const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all")

        ws.onmessage = e => {
            dispatch({ type: WS_GET_MESSAGE, payload: JSON.parse(e.data)})
        }
    }, [])

    console.log(feed.orders);
    
    return (
        <div className={styles.main}>
            <p className='text text_type_main-large pt-10 mb-5'>Лента заказов</p>
            <div className={styles.feed_content}>
                {/* <div className={styles.feed_list}>
                    {feed.orders && feed.orders.map((feedItem: IFeedOrder) => 
                        <FeedItem key={uuid()} data={feedItem}/>
                    )}
                </div> */}
                {/* <div className={styles.feed_info}>
                    <div className={styles.feed_half_block}>
                        <p className='text text_type_main-medium'>Готовы:</p>
                        <ul className={`${styles.orders_list} ${styles.order_list_ready}`}>
                            {feed.orders && feed.orders.map((order: IFeedOrder) => order.status === 'done' &&
                                <li key={uuid()} className='text text_type_digits-default'>{order.number}</li>
                            )}
                        </ul>
                    </div>
                    <div className={styles.feed_half_block}>
                        <p className='text text_type_main-medium'>В работе:</p>
                        <ul className={styles.orders_list}>
                        {feed.orders && feed.orders.map((order: IFeedOrder) => order.status === 'pending' &&
                                <li key={uuid()} className='text text_type_digits-default'>{order.number}</li>
                            )}
                        </ul>
                    </div>
                    <div className={styles.feed_block}>
                        <p className='text text_type_main-medium'>Выполнено за все время:</p>
                        <p className={`${styles.neon} text text_type_digits-large`}>{feed && feed.total}</p>
                    </div>
                    <div className={styles.feed_block}>
                        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                        <p className={`${styles.neon} text text_type_digits-large`}>{feed && feed.totalToday}</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
