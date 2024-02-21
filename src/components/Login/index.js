import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    user_id: '',
    pin: '',
    isShowErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({user_id: event.target.value})
  }

  onChangeUserPin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isShowErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {user_id: userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isShowErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-container-card">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              className="website-login"
              alt="website login"
            />
          </div>
          <form className="input-container" onSubmit={this.onSubmitForm}>
            <h1>Welcome Back!</h1>
            <div className="user-container">
              <label htmlFor="user" className="label">
                User ID
              </label>
              <input
                type="text"
                className="input"
                id="user"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="pin-container">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                className="input"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangeUserPin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isShowErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
