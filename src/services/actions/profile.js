import { request } from "../../utils/request"

export const PROFILE_FORM_SET_VALUE = 'PROFILE_FORM_SET_VALUE'
export const PROFILE_FORM_SUBMIT = 'PROFILE_FORM_SUBMIT'
export const PROFILE_FORM_SUBMIT_SUCCESS = 'PROFILE_FORM_SUBMIT_SUCCESS'
export const PROFILE_FORM_SUBMIT_FAILED = 'PROFILE_FORM_SUBMIT_FAILED'

export const setProfileValue = (field, value) => ({
    type: PROFILE_FORM_SET_VALUE, field, value
})

export const profileChange = () => (dispatch, getState) => {
    dispatch({ type: PROFILE_FORM_SUBMIT });
    request('auth/user', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(getState().profileChangeReducer.form)
    }).then(data => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_SUCCESS,
            payload: data
        });
    }).catch(err => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_FAILED,
        });
    })
}