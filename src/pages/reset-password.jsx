import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const [value, setValue] = useState('')
    const inputRef = useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={styles.container}>
            <form action='' className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setValue(e.target.value)}
                    icon={'ShowIcon'}
                    value={value}
                    name={'ResetPassword'}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'Code'}
                    ref={inputRef}
                    onIconClick={onIconClick}
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
