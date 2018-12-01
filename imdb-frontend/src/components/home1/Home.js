import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'
import { setUserData, userData } from '../../helper' 

export default class Login extends Component {

    componentWillMount() {
        // attachModelToView(new LoginModel(), this)
    }

    render() {
        return (
            <div>
                <h1>HELLO WORLD</h1>
                <a href="#" onClick={(e) => {
                    setUserData(null);
                    window.location.reload();
                }}>Sair</a>
            </div>)
    }
}