import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { passwordReset } from '../../services/actions/reset-password';
import { useResetPasswordForm } from '../../hooks/useResetPasswordForm';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';

export const ResetPasswordPage: React.FC = () => {
    const { values, handleChange } = useResetPasswordForm({ password: '', token: '' })

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

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        //@ts-ignore
        dispatch(passwordReset())
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
                <Input
                    type={inputType.input as 'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    icon={inputType.icon as keyof TICons | undefined}
                    value={values.password || ''}
                    name={'password'}
                    onIconClick={switchPasswordType}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token || ''}
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
