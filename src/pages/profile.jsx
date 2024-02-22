import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

export const ProfilePage = () => {
    

    return (
        <div className={`${styles.profile} mt-30`}>
            <nav className={styles.nav}>
                <NavLink to='' end className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink} text text_type_main-medium` : `${styles.link} text text_type_main-medium text_color_inactive`}>
                    Профиль
                </NavLink>
                <NavLink to='orders' className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink} text text_type_main-medium` : `${styles.link} text text_type_main-medium text_color_inactive`}>
                    История заказов
                </NavLink>
                <NavLink to='/' className={({isActive}) => isActive ? `${styles.link} ${styles.activeLink} text text_type_main-medium` : `${styles.link} text text_type_main-medium text_color_inactive`}>
                    Выход
                </NavLink>
                <p className={`${styles.subText} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            <Outlet />
            
        </div>
    );
}
