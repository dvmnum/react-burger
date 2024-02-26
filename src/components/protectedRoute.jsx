import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader";
import pulseStyles from './pulseStyles.module.css'

import PropTypes from 'prop-types';

const Protected = ({ onlyUnAuth = false, component }) => {
    const isAuthChecked = useSelector(state => state.authReducer.isAuthChecked)
    const user = useSelector(state => state.authReducer.user)
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

Protected.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
) 