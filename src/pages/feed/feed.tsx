import React, { useEffect } from 'react'
import styles from './feed.module.css'
import pulseStyles from '../../components/pulseStyles.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/dispatch'
import { WebsocketStatus } from '../../services/constants'
import FeedItem from '../../components/FeedItem/FeedItem'
import { v4 as uuid } from 'uuid';
import { IFeedOrder } from '../../services/types/data'
import { connect as wsConnect, disconnect as wsDisconnect } from '../../services/actions/wsActions'
import { FEED_API } from '../../utils/burger-api'
import { PulseLoader } from 'react-spinners'

export const FeedPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { status, feed } = useAppSelector(store => store.wsFeedReducer)

    const connect = () => dispatch(wsConnect(FEED_API))
    const disconnect = () => dispatch(wsDisconnect())

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [])
    
    return (
        <div className={styles.main}>
            <p className='text text_type_main-large pt-10 mb-5'>Лента заказов</p>
            {status === WebsocketStatus.CONNECTING &&
                <PulseLoader className={pulseStyles.pulse} color="#36d7b7"/>
            }
            {status === WebsocketStatus.ONLINE && feed !== null &&
                <div className={styles.feed_content}>
                    <div className={styles.feed_list}>
                        {feed.orders && feed.orders.map((feedItem: IFeedOrder) => 
                            <FeedItem key={uuid()} data={feedItem} url='feed'/>
                        )}
                    </div>
                    <div className={styles.feed_info}>
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
                    </div>
                </div>
            }
        </div>
    );
}
