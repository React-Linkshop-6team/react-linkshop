import { useLocation } from 'react-router-dom'

import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()

  if (location.pathname === '/profile') return null

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Linkshop logo" className="header-logo" />
      </div>
      <div className="header-right">
        <Button to="/create">생성하기</Button>
      </div>
    </header>
  )
}

export default Header
