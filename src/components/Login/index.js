import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isWrongPass: false, error: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const loginDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(loginDetails)}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({isWrongPass: false})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isWrongPass: true, error: data.error_msg})
    }

    console.log(data)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {username, password, isWrongPass, error} = this.state
    const loginErr = <p className="error-msg">{`* ${error}`}</p>
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form className="login-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <div className="username-container">
            <label htmlFor="text" className="label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="text"
              className="box"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="pass-container">
            <label htmlFor="pass" className="label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="pass"
              className="box"
              placeholder="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {isWrongPass && loginErr}
        </form>
      </div>
    )
  }
}
export default Login
