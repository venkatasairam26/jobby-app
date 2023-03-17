import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-cont">
      <ul className="header-list">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt=" website logo"
            />
          </Link>
        </li>

        <li>
          <ul className="btns-cont">
            <Link to="/" className="link-item">
              <li>Home</li>
            </Link>
            <Link to="/jobs" className="link-item">
              <li>Jobs</li>
            </Link>
          </ul>
        </li>
        <li>
          <button type="button" onClick={onLogoutBtn}>
            Logout{' '}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
