import { useDispatch, useSelector } from "react-redux";
import { setPasswordResetValue } from "../services/actions/reset-password";

export function useResetPasswordForm() {
  const values = useSelector(state => state.resetPasswordReducer.form)

  const dispatch = useDispatch()

  const handleChange = e => {    
    dispatch(setPasswordResetValue(e.target.name, e.target.value))
  };
  
  return {values, handleChange};
}