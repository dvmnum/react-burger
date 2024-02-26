import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { passwordReset, setPasswordResetValue } from '../services/actions/reset-password';

export const ResetPasswordPage = () => {
    const { password, token } = useSelector(store => store.resetPasswordReducer.form)
    const [ inputType, setInputType ] = useState({ input: 'password', icon: 'ShowIcon' })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const switchPasswordType = () => {
        inputType.input === 'password' ? setInputType({
            input: 'text',
            icon: 'HideIcon',
        }) : setInputType({
            input: 'password',
            icon: 'ShowIcon'
        })
    }

    const onChange = e => {
        dispatch(setPasswordResetValue(e.target.name, e.target.value))
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(passwordReset())
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
                <Input
                    type={inputType.input}
                    placeholder={'Введите новый пароль'}
                    onChange={onChange}
                    icon={inputType.icon}
                    value={password}
                    name={'password'}
                    onIconClick={switchPasswordType}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={token}
                    name={'token'}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                    >
                    Сохранить
                </Button>
            </form>
            <nav className={styles.nav}>
                <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </nav>
        </div>
    );
}
