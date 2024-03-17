import { fetchWithRefresh } from "../../utils/request"

export const PASSWORD_FORGOT_SET_EMAIL = 'PASSWORD_FORGOT_SET_EMAIL'
export const PASSWORD_FORGOT_SUBMIT = 'PASSWORD_FORGOT_SUBMIT'
export const PASSWORD_FORGOT_SUBMIT_SUCCESS = 'PASSWORD_FORGOT_SUBMIT_SUCCESS'
export const PASSWORD_FORGOT_SUBMIT_FAILED = 'PASSWORD_FORGOT_SUBMIT_FAILED'

export const setPasswordForgotValue = (value: string) => ({
    type: PASSWORD_FORGOT_SET_EMAIL, value
})

// @ts-ignore
export const passwordForgot = () => (dispatch, getState) => {
    dispatch({ type: PASSWORD_FORGOT_SUBMIT });
    fetchWithRefresh('password-reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        }, 
        body: JSON.stringify(getState().forgotPasswordReducer.form)
    }).then((res) => {
        dispatch({
            type: PASSWORD_FORGOT_SUBMIT_SUCCESS,
        });
    }).catch(err => {
        dispatch({
            type: PASSWORD_FORGOT_SUBMIT_FAILED,
        });
    })
}