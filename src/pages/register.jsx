import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, setFormValue } from '../services/actions/registration';
import { createRef, useRef, useState } from 'react';

export const RegisterPage = () => {
    const { email, password, name } = useSelector(state => state.registrationReducer.form)
    const [ inputType, setInputType ] = useState({ input: 'password', icon: 'ShowIcon' })

    const dispatch = useDispatch()
    const passwordRef = createRef()

    const onFormChange = e => {
        dispatch(setFormValue(e.target.name, e.target.value))
    }

    const switchPasswordType = e => {
        inputType.input === 'password' ? setInputType({
            input: 'text',
            icon: 'HideIcon',
        }) : setInputType({
            input: 'password',
            icon: 'ShowIcon'
        })
    }

    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(register())
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onFormSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onFormChange}
                    value={name}
                    name={'name'}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={onFormChange}
                    value={email}
                    name={'email'}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={inputType.input}
                    placeholder={'Пароль'}
                    onChange={onFormChange}
                    icon={inputType.icon}
                    value={password}
                    name={'password'}
                    ref={passwordRef}
                    onIconClick={switchPasswordType}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                >
                    Зарегистрироваться
                </Button>
            </form>
            <nav className={styles.nav}>
                <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
            </nav>
        </div>
    );
}
