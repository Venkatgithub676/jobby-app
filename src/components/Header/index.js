import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdBusinessCenter} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const lapVersion = () => (
    <div className="home-jobs-logout-lap-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="jobby-logo"
        />
      </Link>
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
  )

  const mobileVersion = () => (
    <div className="home-jobs-logout-mob-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="jobby-logo"
        />
      </Link>
      <ul className="mobile-view-nav-icons">
        <Link to="/" className="link-btn btn1">
          <li>
            <button type="button" className="buttons">
              <AiFillHome />
            </button>
          </li>
        </Link>

        <Link to="/jobs" className="link-btn btn1">
          <li>
            <button type="button" className="buttons">
              <MdBusinessCenter />
            </button>
          </li>
        </Link>

        <li>
          <button type="button" className="buttons" onClick={onClickLogout}>
            <FiLogOut />
          </button>
        </li>
      </ul>
    </div>
  )
  return (
    <nav className="home-nav-container">
      {mobileVersion()}
      {lapVersion()}
    </nav>
  )
}

export default withRouter(Header)
