import logo from '../assets/images/logo.png'
import '../assets/scss/Setting.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Linkshop logo" className="header-logo" />
      </div>
      <div className="header-right">
        <button className="create-button">생성하기</button>
      </div>
    </header>
  )
}

export default Header
