import { useDispatch, useSelector } from "react-redux";
import { setProfileValue } from "../services/actions/profile";
import { useState } from "react";

type PUForm = (arg0: { name: string, email: string, password: string }) => {
  values: { [key: string]: string },
  inputs: boolean,
  changed: React.Dispatch<React.SetStateAction<boolean>>,
  handleChange: (e: React.SyntheticEvent) => void,
}

export const useProfileUserForm: PUForm = () => {
  const values = useSelector((store: any) => store.profileChangeReducer.form)
  const [ inputs, changed ] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e: React.SyntheticEvent) => {    
    dispatch(setProfileValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
    changed(true)
  };
  
  return {values, inputs, changed, handleChange};
}