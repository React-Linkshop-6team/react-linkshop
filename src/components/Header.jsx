import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, get, child } from 'firebase/database'

import { db } from '../firebase'
import { getShops } from '../api/api'
import profileImg from '../assets/images/linkshop.png'
import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasShop, setHasShop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setIsLoggedIn(true)
        if (sessionStorage.getItem('hasShop') === 'true') {
          setHasShop(true)
        }
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

  useEffect(() => {
    if (isLoggedIn && sessionStorage.getItem('hasShop') === 'true') {
      setHasShop(true)
    }
  }, [location.pathname])

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('linkshopUser')
        }
        window.location.href = '/'
      })
      .catch(error => {
        console.error('로그아웃 실패:', error)
      })
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  if (location.pathname.startsWith('/profile')) return null

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Linkshop logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <div className="profile-wrapper">
            <img src={profileImg} alt="profile" className="profile-image" onClick={toggleMenu} />
            {isMenuOpen && (
              <div className="dropdown-menu">
                {hasShop ? (
                  <Link to="/mystore" onClick={() => setIsMenuOpen(false)}>
                    내 스토어
                  </Link>
                ) : (
                  <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                    생성하기
                  </Link>
                )}
                <button className="logout-button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
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
