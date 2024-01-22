import headerStyles from "./AppHeader.module.css"
import React from 'react';
import Link from "../Link/Link.jsx"
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    const [current, setCurrent] = React.useState(true);

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.headerInner}>
                <nav className={headerStyles.navLeft}>
                    <Link clickHandler={() => setCurrent(true)} isActive={current} text="Конструктор" icon="burger">
                        
                    </Link>
                    <Link clickHandler={() => setCurrent(false)} isActive={!current} text="Лента заказов" icon="list">

                    </Link>
                </nav>

                <Logo />

                <nav className={headerStyles.navRight}>
                    <Link text="Личный кабинет" icon="person">
                        
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;