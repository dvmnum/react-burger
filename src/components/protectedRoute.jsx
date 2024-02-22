import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader";

const Protected = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useSelector(state => state.authReducer.isAuthChecked)
    const user = useSelector(state => state.authReducer.user)
    const location = useLocation()

    if (!isAuthChecked) {
        return <PulseLoader color="#801AB2"/>
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

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
) 