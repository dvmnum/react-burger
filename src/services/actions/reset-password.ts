import { fetchWithRefresh } from "../../utils/request"

export const PASSWORD_RESET_SET_VALUE = 'PASSWORD_FORGOT_SET_EMAIL'
export const PASSWORD_RESET_SUBMIT = 'PASSWORD_FORGOT_SUBMIT'
export const PASSWORD_RESET_SUBMIT_SUCCESS = 'PASSWORD_FORGOT_SUBMIT_SUCCESS'
export const PASSWORD_RESET_SUBMIT_FAILED = 'PASSWORD_FORGOT_SUBMIT_FAILED'

export const setPasswordResetValue = (field: string, value: string) => ({
    type: PASSWORD_RESET_SET_VALUE, field, value
})

//@ts-ignore
export const passwordReset = () => (dispatch, getState) => {
    dispatch({ type: PASSWORD_RESET_SUBMIT });
    fetchWithRefresh('password-reset/reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        }, 
        body: JSON.stringify(getState().resetPasswordReducer.form)
    }).then((res) => {
        dispatch({
            type: PASSWORD_RESET_SUBMIT_SUCCESS,
        });
    }).catch(err => {
        dispatch({
            type: PASSWORD_RESET_SUBMIT_FAILED,
        });
    })
}