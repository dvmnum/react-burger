import styles from "./Link.module.css"
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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

Link.propTypes = {
    isActive: PropTypes.bool,
    clickHandler: PropTypes.func,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Link