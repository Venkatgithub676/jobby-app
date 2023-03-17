import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/')
  }
  return (
    <nav className="home-nav-container">
      <div className="home-nav-dtls-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="home"
          className="jobby-logo"
        />
        <div>
          <Link to="/" className="link-btn">
            <button type="button" className="buttons">
              Home
            </button>
          </Link>
          <Link to="/jobs" className="link-btn">
            <button type="button" className="buttons">
              Jobs
            </button>
          </Link>
        </div>
        <button type="button" onClick={onClickLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
