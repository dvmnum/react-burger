import styles from './login.module.css'
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { passwordForgot } from '../../services/actions/forgot-password';
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';
import { useAppDispatch } from '../../utils/dispatch';

export const ForgotPasswordPage: React.FC = () => {
    const { values, handleChange } = useForgotPasswordForm({ email: '' })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(passwordForgot())
        navigate('/reset-password')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                <p className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</p>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    value={values.email || ''}
                    onChange={handleChange}
                    name={'ForgotPasswordEmail'}
                    errorText={'Ошибка'}
                    size={'default'}
                    autoComplete={'email'}
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
