import { useDispatch, useSelector } from "react-redux";
import { setPasswordForgotValue } from "../services/actions/forgot-password";

type FPForm = (arg0: { email: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.SyntheticEvent) => void;
}

export const useForgotPasswordForm: FPForm = () => {
  const values = useSelector((state: any) => state.forgotPasswordReducer.form)

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent) => {    
    dispatch(setPasswordForgotValue((e.target as HTMLInputElement).value))
  };
  
  return {values, handleChange};
}