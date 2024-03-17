import { setFormValue } from "../services/actions/registration";
import { useAppDispatch, useAppSelector } from "../utils/dispatch";

type RForm = (arg0: { email: string, password: string, name: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useRegisterForm: RForm = () => {
  const values = useAppSelector(store => store.registrationReducer.form)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    dispatch(setFormValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  };
  
  return {values, handleChange};
}