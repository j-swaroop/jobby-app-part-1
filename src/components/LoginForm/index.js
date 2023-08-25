//Login js
import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component{
    state = {
        username: "",
        password: "",
        errorMsg: "",
        showErrorMsg: false
    }

    onSubmitSuccess = jwtToken => {
        const {history} = this.props

        Cookies.set("jwt_token", jwtToken, {expires: 30})
        history.replace('/')
    }

    onSubmitFailure = errorMsg => {
        this.setState({errorMsg: errorMsg, showErrorMsg: true})
    }

    onSubmitForm = async event => {
        event.preventDefault()

        const {username, password} = this.state
        const userDetails = {username, password}

        const url = "https://apis.ccbp.in/login"
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if(response.ok === true){
            this.onSubmitSuccess(data.jwt_token)
        }else{
            this.onSubmitFailure(data.error_msg)
        }

    }

    renderUserNameFeild = () => {
        const {username} = this.state
        return(
            <>
                <label className="label-el" htmlFor="UserName"> USERNAME </label>
                <input onChange={this.onChangeUserName}
                    type="text" id="UserName" value={username}
                    placeholder="Username" className="input-feild"
                />
            </>
        )
    }

    renderPasswordFeild = () => {
        const {password} = this.state
         return(
            <>
                <label className="label-el" htmlFor="Password"> PASSWORD </label>
                <input onChange={this.onChangeUserPassword}
                    type="password" id="Password" value={password}
                    placeholder="Password" className="input-feild"
                />
            </>
        )
    }

    onChangeUserName = event => {
        this.setState({username: event.target.value})
    }

    onChangeUserPassword = event => {
        this.setState({password: event.target.value})
    }

    render(){
        const jwtToken = Cookies.get("jwt_token")
        if (jwtToken !== undefined){
            return <Redirect to="/" />
        }

        const {showErrorMsg, errorMsg} = this.state

        return(
            <div className="login-form-bg-container">
                <form className="login-form" onSubmit={this.onSubmitForm}>
                    <img alt="website logo" className="website-logo"
                        src="https://assets.ccbp.in/frontend/react-js/logo-img.png" />

                    <div className="input-container">
                        {this.renderUserNameFeild()}
                    </div>

                    <div className="input-container">
                        {this.renderPasswordFeild()}
                    </div>

                    <button type="submit" className="login-button"> Login </button>
                    {showErrorMsg && <p className="error-msg"> *{errorMsg} </p>}
                </form>
            </div>
        )
    }
}


export default LoginForm