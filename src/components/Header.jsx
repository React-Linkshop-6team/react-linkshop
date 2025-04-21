// import { useLocation, Link } from 'react-router-dom'

// import logo from '../assets/images/logo.png'
// import Button from './common/Button'

// const Header = () => {
//   const location = useLocation()

//   if (location.pathname === '/profile') return null

//   return (
//     <header className="header">
//       <div className="header-left">
//         <Link to="/">
//           <img src={logo} alt="Linkshop logo" className="header-logo" />
//         </Link>
//       </div>
//       <div className="header-right">
//         <Button to="/create">생성하기</Button>
//       </div>
//     </header>
//   )
// }

// export default Header

import { useLocation, Link } from 'react-router-dom'

import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()

  // 현재 위치가 /profile 페이지라면 헤더를 렌더링하지 않음
  if (location.pathname === '/profile') return null

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Linkshop logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right">
        {location.pathname === '/create' ? (
          <Button to="/list">돌아가기</Button>
        ) : (
          <Button to="/create">생성하기</Button>
        )}
      </div>
    </header>
  )
}

export default Header
