import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, get, child } from 'firebase/database'

import { db } from '../firebase'
import { getShops } from '../api/api'
import profileImg from '../assets/images/linkshop.png'
import logo from '../assets/images/logo.png'
import Button from './common/Button'

const Header = () => {
  const location = useLocation()
  const menuRef = useRef(null)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasShop, setHasShop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()

    const sessionUser = sessionStorage.getItem('linkshopUser')
    const parsedUser = sessionUser ? JSON.parse(sessionUser) : null

    if (parsedUser) {
      setIsLoggedIn(true)
      if (sessionStorage.getItem('hasShop') === 'true') {
        setHasShop(true)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async user => {
      const latestSessionUser = sessionStorage.getItem('linkshopUser')
      const latestParsedUser = latestSessionUser ? JSON.parse(latestSessionUser) : null

      if (user && latestParsedUser) {
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
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isLoggedIn && sessionStorage.getItem('hasShop') === 'true') {
      setHasShop(true)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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

  if (isLoading) return null

  if (location.pathname === '/profile') return null

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Linkshop logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <div className="profile-wrapper" ref={menuRef}>
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
