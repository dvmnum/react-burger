import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux"
import { profileChange, setProfileValue } from "../services/actions/profile"

export const User = () => {
    const { name, email, password } = useSelector(store => store.profileChangeReducer.form)

    const dispatch = useDispatch()

    const onFormChange = e => {
        dispatch(setProfileValue(e.target.name, e.target.value))
    }

    const onSubmit = e => {
        e.preventDefault();
        dispatch(profileChange())
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                icon={'EditIcon'}
                value={name ? name : ''}
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={onFormChange}
                icon={'EditIcon'}
                value={email ? email : ''}
                name={'email'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='mb-6'
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onFormChange}
                icon={'EditIcon'}
                value={password ? password : ''}
                name={'password'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass='mb-6'
            />
            <div className={styles.buttons}>
                <Button
                    htmlType="reset"
                    type="secondary"
                    size="medium"
                    extraClass={styles.button}
                >
                    Отменить
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    extraClass={styles.button}
                >
                    Сохранить
                </Button>
            </div>
        </form>
    )
}