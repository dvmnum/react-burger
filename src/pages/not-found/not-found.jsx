import styles from './not-found.module.css'

export const NotFoundPage = () => {

    return (
        <div className={styles.message}>
            <p className='text text_type_digits-large'>404</p>
            <p className='text text_type_main-default text_color_inactive'>Такой страницы не существует</p>
        </div>
    );
}
