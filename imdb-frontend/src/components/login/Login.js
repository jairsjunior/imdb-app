import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'

import LoginModel from './LoginModel'
import loginStyle from './Login.css'

export default class Login extends Component {

    componentWillMount() {
        attachModelToView(new LoginModel(), this)
    }

    render() {
        return (
            <div className={loginStyle.wrap}>
                <h1>Bem-vindo!</h1>
                <div className={loginStyle.caption}>IMDB Top 250</div>
                <form className={loginStyle.formWrap} onSubmit={(e) => { this.viewModel.doLogin();;e.preventDefault(); return false; }}>
                    <input id="username" placeholder="username" type="text" onChange={(e) => this.viewModel.username = e.target.value} />
                    <input placeholder="password" type="password" onChange={(e) => this.viewModel.password = e.target.value} />
                    <input type="submit" className={loginStyle.submitButton} value="Entrar"></input>
                </form>
            </div>
        )
    }
}