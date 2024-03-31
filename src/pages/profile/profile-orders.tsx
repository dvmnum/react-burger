import { useAppDispatch, useAppSelector } from "../../utils/dispatch"
import { userConnect as wsUserConnect, userDisconnect as wsUserDisconnect } from '../../services/actions/wsUserActions'
import { FEED_USER_API } from "../../utils/burger-api"
import { useCallback, useEffect } from "react"
import styles from './profile.module.css'
import pulseStyles from '../../components/pulseStyles.module.css'
import { PulseLoader } from "react-spinners"
import { WebsocketStatus } from "../../services/constants"
import { IFeedOrder } from "../../services/types/data"
import FeedItem from "../../components/FeedItem/FeedItem"

export const Orders: React.FC = () => {
    const dispatch = useAppDispatch()
    const { status, feed } = useAppSelector(store => store.wsFeedUserReducer)

    const connect = useCallback(() => dispatch(wsUserConnect(FEED_USER_API)), [dispatch])
    const disconnect = useCallback(() => dispatch(wsUserDisconnect()), [dispatch])

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [connect, disconnect])

    return (
        <div className={styles.orders_page}>
            {status === WebsocketStatus.CONNECTING &&
                <PulseLoader className={pulseStyles.pulse} color="#36d7b7"/>
            }
            {status === WebsocketStatus.ONLINE && feed !== null &&
                feed.orders && feed.orders.map((feedItem: IFeedOrder, index: number) => 
                    <FeedItem key={index} data={feedItem} url='profile/orders'/>
                )
            }
        </div>
    )
}