import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', loginErrMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessForm = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessForm(data.jwt_token)
    } else {
      this.setState({loginErrMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, loginErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-cont">
        <form onSubmit={this.submitForm} className="form-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt=" website logo"
          />
          <div className="login-input-ele">
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
              className="input-ele"
            />
          </div>
          <div className="login-input-ele">
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              className="input-ele"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <p>{loginErrMsg}</p>
        </form>
      </div>
    )
  }
}
export default Login
