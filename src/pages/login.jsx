import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, setLoginValue } from '../services/actions/login';

export const LoginPage = () => {
    const { email, password } = useSelector(store => store.loginReducer.form)
    const success = useSelector(store => store.loginReducer.loginSuccess)
    const [ inputType, setInputType ] = useState({ input: 'password', icon: 'ShowIcon' })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const passwordRef = createRef()

    const onFormChange = e => {
        dispatch(setLoginValue(e.target.name, e.target.value))
    }

    const switchPasswordType = () => {
        inputType.input === 'password' ? setInputType({
            input: 'text',
            icon: 'HideIcon',
        }) : setInputType({
            input: 'password',
            icon: 'ShowIcon'
        })
    }

    useEffect(() => {
        success && navigate('/profile');
    }, [success, navigate])

    const onFormSubmit = e => {
        e.preventDefault();
        dispatch(login())
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onFormSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Вход</p>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onFormChange}
                    
                    value={email ? email : ''}
                    name={'email'}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={inputType.input}
                    placeholder={'Пароль'}
                    onChange={onFormChange}
                    icon={inputType.icon}
                    value={password ? password : ''}
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
                    Войти
                </Button>
            </form>
            <nav className={styles.nav}>
                <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
            </nav>
        </div>
        
    );
}
