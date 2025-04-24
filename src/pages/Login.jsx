import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import app from '../firebase'

const Login = () => {
  const auth = getAuth(app)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const nav = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const email = `${userId}@linkshop.com`
      await signInWithEmailAndPassword(auth, email, password)
      nav('/')
    } catch (error) {
      setError('로그인 실패: ' + error.message)
    }
  }

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </div>
  )
}

export default Login
