import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../services/actions/registration";

type RForm = (arg0: { email: string, password: string, name: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.SyntheticEvent) => void;
}

export const useRegisterForm: RForm = () => {
  const values = useSelector((state: any) => state.registrationReducer.form)

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent) => {    
    dispatch(setFormValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  };
  
  return {values, handleChange};
}