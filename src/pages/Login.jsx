import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import app from '../firebase'
import eyes from '../assets/images/eyes.png'
import eyeClick from '../assets/images/eyeClick.png'

const Login = () => {
  const auth = getAuth(app)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const nav = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const email = `${userId}@linkshop.com`
      await signInWithEmailAndPassword(auth, email, password)
      sessionStorage.setItem('linkshopUser', JSON.stringify({ userId, password }))
      nav('/')
      window.location.reload()
    } catch (error) {
      setError('로그인 실패: 아이디나 비밀번호를 다시 확인해주세요.')
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          className="form-input"
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            className="form-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <img
            src={showPassword ? eyeClick : eyes}
            alt="비밀번호 보기 토글"
            className="eyes"
            onClick={() => setShowPassword(prev => !prev)}
          />
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="signup-link">
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </div>
  )
}

export default Login
