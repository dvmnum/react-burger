import styles from "./Link.module.css"
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Link({ isActive, clickHandler, text, icon }) {
    return (
        <div onClick={clickHandler} className={`${isActive ? 'active' : ''} ${styles.link} pt-4 pb-4 pr-5 pl-5`}>
            {icon === 'burger' ? <BurgerIcon type={isActive ? 'primary' : 'secondary'}/> : null}
            {icon === 'list' ? <ListIcon type={isActive ? 'primary' : 'secondary'}/> : null}
            {icon === 'person' ? <ProfileIcon type={isActive ? 'primary' : 'secondary'}/> : null}
            <span className={`${!isActive ? 'text_color_inactive' : ''} text text_type_main-default ml-2`}>{text}</span>
        </div>
    );
}

export default Link