import React from 'react'
import { Button } from 'react-bootstrap'

export default function Header(props) {
    const onConnectButton = () => {
        props.handleConnectCallBack()
    }

    const onDisconnectButton = () => {
        props.handleDisconnectCallBack()
    }

    return (
        <>
            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        <strong>Lottery in Crypto ✨</strong>
                    </a>
                    {
                        props.account != null && props.account !== '' ?
                        <><span style={{color: '#fff'}}>{props.account}</span>
                        <Button variant="danger" onClick={onDisconnectButton}>Disconnect wallet</Button>
                        </>
                        :
                        <Button variant="primary" onClick={onConnectButton}>Connect wallet</Button>
                    }
                </div>
            </div>
        </>
    )
}
