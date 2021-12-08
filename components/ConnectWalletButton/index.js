import React from 'react'
import useAuth from '../../hooks/useAuth'
import CustomContainedButton from "../CustomContainedButton";
import {ConnectorName} from "../../constants";

const ConnectButton = (props) => {
    const { login, logout } = useAuth()

    return (
        <CustomContainedButton btnTitle={'Connect Wallet'} customStyles={{ color: 'white' }} onClick={() => login(ConnectorName)} {...props}/>
    )
}

export default ConnectButton
