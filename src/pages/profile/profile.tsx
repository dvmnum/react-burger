import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './profile.module.css'
import { logOut } from '../../services/actions/profile';
import { useAppDispatch } from '../../utils/dispatch';

export const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch()
    
    const handleLogOut = () => {
        dispatch(logOut())
    }

    let url = useLocation()
    let params = useParams()

    return (
        <>
        {params.number ?
            <Outlet /> :
            <div className={`${styles.profile} pt-30`}>
                <nav className={styles.nav}>
                    <NavLink to='' end className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink} text text_type_main-medium` : `${styles.link} text text_type_main-medium text_color_inactive`}>
                        Профиль
                    </NavLink>
                    <NavLink to='orders' className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink} text text_type_main-medium` : `${styles.link} text text_type_main-medium text_color_inactive`}>
                        История заказов
                    </NavLink>
                    <p onClick={handleLogOut} className={`${styles.link} text text_type_main-medium text_color_inactive`}>
                        Выход
                    </p>
                    {url.pathname === '/profile' ? 
                        <p className={`${styles.subText} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p> :
                        <p className={`${styles.subText} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете просмотреть свою историю заказов</p>
                    }
                </nav>
                <Outlet />
            </div>
        }
            
        </>
        
    );
}
