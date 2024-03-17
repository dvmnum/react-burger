import { setPasswordForgotValue } from "../services/actions/forgot-password";
import { useAppDispatch, useAppSelector } from "../utils/dispatch";

type FPForm = (arg0: { email: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useForgotPasswordForm: FPForm = () => {
  const values = useAppSelector(state => state.forgotPasswordReducer.form)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    dispatch(setPasswordForgotValue((e.target as HTMLInputElement).value))
  };
  
  return {values, handleChange};
}