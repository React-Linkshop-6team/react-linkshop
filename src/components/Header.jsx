import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, ref, get, child } from 'firebase/database'
import { db } from '../firebase'
import { getShops } from '../api/api'

import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasShop, setHasShop] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setIsLoggedIn(true)
        const uid = user.uid
        const snapshot = await get(child(ref(db), `users/${uid}`))
        if (!snapshot.exists()) return

        const userId = snapshot.val().userId
        const allShops = await getShops()
        const shopExists = allShops.some(shop => shop.userId === userId)
        setHasShop(shopExists)
      } else {
        setIsLoggedIn(false)
        setHasShop(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth).catch(error => {
      console.error('로그아웃 실패:', error)
    })
  }

  if (location.pathname.startsWith('/profile')) return null

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Linkshop logo" className="header-logo" />
        </Link>
      </div>
      {/* <div className="header-right">
        {location.pathname === '/create' ? (
          <Button to="/">돌아가기</Button>
        ) : (
          <Button to="/create">생성하기</Button>
        )}
      </div> */}
      {/* <div>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
      </div> */}
      <div>
        {isLoggedIn ? (
          <>
            {hasShop ? (
              <Link to="/mystore">
                <Button>내 스토어</Button>
              </Link>
            ) : (
              <Link to="/create">
                <Button>생성하기</Button>
              </Link>
            )}
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
