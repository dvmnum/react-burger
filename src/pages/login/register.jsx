import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, setFormValue } from '../../services/actions/registration';
import { createRef, useState } from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm';

export const RegisterPage = () => {
    const [ inputType, setInputType ] = useState({ input: 'password', icon: 'ShowIcon' })
    const { values, handleChange } = useRegisterForm({ email: '', password: '', name: '' })

    const dispatch = useDispatch()
    const passwordRef = createRef()

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
                    onChange={handleChange}
                    value={values.name || ''}
                    name={'name'}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'name'}
                />
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={handleChange}
                    value={values.email || ''}
                    name={'email'}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'email'}
                />
                <Input
                    type={inputType.input}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    icon={inputType.icon}
                    value={values.password || ''}
                    name={'password'}
                    ref={passwordRef}
                    onIconClick={switchPasswordType}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'password'}
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
