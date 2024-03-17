import { setPasswordResetValue } from "../services/actions/reset-password";
import { useAppDispatch, useAppSelector } from "../utils/dispatch";

type RPForm = (arg0: { password: string, token: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useResetPasswordForm: RPForm = () => {
  const values = useAppSelector(store => store.resetPasswordReducer.form)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    dispatch(setPasswordResetValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
      ))
  };
  
  return {values, handleChange};
}