import { useDispatch, useSelector } from "react-redux";
import { setPasswordForgotValue } from "../services/actions/forgot-password";

export function useForgotPasswordForm() {
  const values = useSelector(state => state.forgotPasswordReducer.form)

  const dispatch = useDispatch()

  const handleChange = e => {    
    dispatch(setPasswordForgotValue(e.target.value))
  };
  
  return {values, handleChange};
}