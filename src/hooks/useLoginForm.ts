import { useDispatch, useSelector } from "react-redux";
import { setLoginValue } from "../services/actions/login";

type LForm = (arg0: { email: string, password: string }) => {
  values: { [key: string]: string },
  handleChange: (e: React.SyntheticEvent) => void;
}

export const useLoginForm: LForm = () => {
  const values = useSelector((store: any) => store.loginReducer.form)

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent) => {    
    dispatch(setLoginValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
  };
  
  return {values, handleChange};
}