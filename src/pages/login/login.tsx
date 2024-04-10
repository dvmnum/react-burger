import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { createRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/actions/login';
import { useLoginForm } from '../../hooks/useLoginForm';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { useAppDispatch, useAppSelector } from '../../utils/dispatch';

export const LoginPage: React.FC = () => {
    const success = useAppSelector(store => store.loginReducer.loginSuccess)
    const [ inputType, setInputType ] = useState({ input: 'password', icon: 'ShowIcon' })
    const { values, handleChange } = useLoginForm({ email: '', password: '' })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const passwordRef = createRef<HTMLInputElement>()

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

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                    onChange={handleChange}
                    value={values.email || ''}
                    name={'email'}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'email'}
                    data-testid='email_input'
                />
                <Input
                    type={inputType.input as 'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={inputType.icon as keyof TICons | undefined}
                    value={values.password || ''}
                    name={'password'}
                    ref={passwordRef}
                    onIconClick={switchPasswordType}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'password'}
                    data-testid='password_input'
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                    data-testid='submit_button'
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
