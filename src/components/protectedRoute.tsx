import { Navigate, useLocation } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader";
import pulseStyles from './pulseStyles.module.css'
import { useAppSelector } from "../utils/dispatch";

type ProtectedProps = {
    onlyUnAuth?: boolean,
    component: JSX.Element
}

const Protected: React.FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useAppSelector(store => store.authReducer.isAuthChecked)
    const user = useAppSelector(store => store.authReducer.user)
    const location = useLocation()

    if (!isAuthChecked) {
        return <PulseLoader className={pulseStyles.pulse} color="#36d7b7"/>
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }}/>
    }

    return component
}

export const OnlyAuth: React.FC<ProtectedProps> = Protected
export const OnlyUnAuth: React.FC<ProtectedProps> = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
) 