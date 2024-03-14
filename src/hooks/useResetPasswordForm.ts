import { useDispatch, useSelector } from "react-redux";
import { setPasswordResetValue } from "../services/actions/reset-password";

type RPForm = (arg0: { password: string, token: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.SyntheticEvent) => void;
}

export const useResetPasswordForm: RPForm = () => {
  const values = useSelector((state: any) => state.resetPasswordReducer.form)

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent) => {    
    dispatch(setPasswordResetValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
      ))
  };
  
  return {values, handleChange};
}