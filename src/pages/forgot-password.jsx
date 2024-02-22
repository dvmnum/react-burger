import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {

    const onSubmit = e => {
        e.preventDefault()
        // dispatch
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    value={''}
                    name={'ForgotPasswordEmail'}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                    >
                    Восстановить
                </Button>
            </form>
            <nav className={styles.nav}>
                <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </nav>
        </div>
    );
}
