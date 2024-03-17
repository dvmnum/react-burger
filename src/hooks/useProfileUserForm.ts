import { setProfileValue } from "../services/actions/profile";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/dispatch";

type PUForm = (arg0: { name: string, email: string, password: string }) => {
  values: { [key: string]: string },
  inputs: boolean,
  changed: React.Dispatch<React.SetStateAction<boolean>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const useProfileUserForm: PUForm = () => {
  const values = useAppSelector(store => store.profileChangeReducer.form)
  const [ inputs, changed ] = useState(false)

  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    dispatch(setProfileValue(
      (e.target as HTMLInputElement).name,
      (e.target as HTMLInputElement).value
    ))
    changed(true)
  };
  
  return {values, inputs, changed, handleChange};
}