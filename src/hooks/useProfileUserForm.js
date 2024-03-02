import { useDispatch, useSelector } from "react-redux";
import { setProfileValue } from "../services/actions/profile";
import { useState } from "react";

export function useProfileUserForm() {
  const values = useSelector(store => store.profileChangeReducer.form)
  const [ inputs, changed ] = useState(false)

  const dispatch = useDispatch()

  const handleChange = e => {    
    dispatch(setProfileValue(e.target.name, e.target.value))
    changed(true)
  };
  
  return {values, inputs, changed, handleChange};
}