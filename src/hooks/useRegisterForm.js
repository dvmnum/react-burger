import { useDispatch, useSelector } from "react-redux";
import { setFormValue } from "../services/actions/registration";

export function useRegisterForm() {
  const values = useSelector(state => state.registrationReducer.form)

  const dispatch = useDispatch()

  const handleChange = e => {    
    dispatch(setFormValue(e.target.name, e.target.value))
  };
  
  return {values, handleChange};
}