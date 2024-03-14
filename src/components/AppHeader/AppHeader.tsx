import headerStyles from "./AppHeader.module.css"
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from "react-router-dom";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from "react-redux";

const AppHeader: React.FC = () => {
    const user = useSelector((store: any) => store.authReducer.user)

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.headerInner}>
                <nav className={headerStyles.navLeft}>
                    <NavLink to='' className={({isActive}) => isActive ? `${headerStyles.link} pt-4 pb-4 pr-5 pl-5 active` : `${headerStyles.link} pt-4 pb-4 pr-5 pl-5`}>
                        {({isActive}) => (
                            <>
                                <BurgerIcon type={isActive ? 'primary' : 'secondary'}/>
                                <span className={`${isActive ? headerStyles.activeLink : 'text_color_inactive'} text text_type_main-default ml-2`}>Конструктор</span>
                            </>
                        )}
                    </NavLink>
                    <NavLink to='list' className={({isActive}) => isActive ? `${headerStyles.link} pt-4 pb-4 pr-5 pl-5 active` : `${headerStyles.link} pt-4 pb-4 pr-5 pl-5`}>
                        {({isActive}) => (
                            <>
                                <ListIcon type={isActive ? 'primary' : 'secondary'}/>
                                <span className={`${isActive ? headerStyles.activeLink : 'text_color_inactive'} text text_type_main-default ml-2`}>Лента заказов</span>
                            </>
                        )}
                    </NavLink>
                </nav>

                <Link to='/'>
                    <Logo />
                </Link>

                <nav className={headerStyles.navRight}>
                    <NavLink to='profile' className={({isActive}) => isActive ? `${headerStyles.link} pt-4 pb-4 pr-5 pl-5 active` : `${headerStyles.link} pt-4 pb-4 pr-5 pl-5`}>
                        {({isActive}) => (
                            <>
                                <ProfileIcon type={isActive ? 'primary' : 'secondary'}/>
                                <span className={`${isActive ? headerStyles.activeLink : 'text_color_inactive'} text text_type_main-default ml-2`}>{user ? user.name : 'Личный кабинет'}</span>
                            </>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;