import { setLoginValue } from "../services/actions/login";
import { useAppDispatch, useAppSelector } from "../utils/dispatch";

type LForm = (arg0: { email: string, password: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useLoginForm: LForm = () => {
  const values = useAppSelector(store => store.loginReducer.form)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    dispatch(setLoginValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  };
  
  return {values, handleChange};
}