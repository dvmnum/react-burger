import { useDispatch, useSelector } from "react-redux";
import { setLoginValue } from "../services/actions/login";

export function useLoginForm() {
  const values = useSelector(store => store.loginReducer.form)

  const dispatch = useDispatch()

  const handleChange = e => {    
    dispatch(setLoginValue(e.target.name, e.target.value))
  };
  
  return {values, handleChange};
}