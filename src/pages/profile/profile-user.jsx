import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux"
import { profileChange, profileGet, setProfileValue } from "../../services/actions/profile"
import { useEffect, useState } from "react"
import { setUser } from "../../services/actions/checkAuth"
import { useProfileUserForm } from "../../hooks/useProfileUserForm"

export const User = () => {
    const { values, handleChange, inputs, changed, } = useProfileUserForm({ name: '', email: '', password: '' })
    const [ readOnly, setReadOnly ] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(profileGet())
    }, [dispatch])

    const onIconClick = () => {
        readOnly === true ? setReadOnly(false) : setReadOnly(true)
    }

    const onSubmit = e => {
        e.preventDefault();
        dispatch(profileChange())

        dispatch(setUser({ name: values.name, email: values.email }))
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={values.name || ''}
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                onIconClick={onIconClick}
                readOnly={readOnly}
                disabled={readOnly}
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={values.email || ''}
                name={'email'}
                errorText={'Ошибка'}
                size={'default'}
                onIconClick={onIconClick}
                readOnly={readOnly}
                disabled={readOnly}
                extraClass='mb-6'
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={values.password || ''}
                name={'password'}
                errorText={'Ошибка'}
                size={'default'}
                onIconClick={onIconClick}
                readOnly={readOnly}
                disabled={readOnly}
                extraClass='mb-6'
            />
            <div className={styles.buttons} style={{ opacity: inputs ? 1 : 0 }}>
                <Button
                    htmlType="reset"
                    type="secondary"
                    size="medium"
                    extraClass={styles.button}
                    onClick={() => {changed(false); setReadOnly(true)}}
                >
                    Отменить
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                    onClick={() => {changed(false); setReadOnly(true)}}
                >
                    Сохранить
                </Button>
            </div>
        </form>
    )
}