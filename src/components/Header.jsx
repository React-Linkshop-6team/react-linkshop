import { useLocation, Link } from 'react-router-dom'

import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()

  if (location.pathname.startsWith('/profile')) return null

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Linkshop logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right">
        <Button to="/create">생성하기</Button>
      </div>
    </header>
  )
}

export default Header
