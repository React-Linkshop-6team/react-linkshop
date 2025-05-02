import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

import app, { db } from '../firebase'
import eyes from '../assets/images/eyes.webP'
import eyeClick from '../assets/images/eyeClick.webP'

const Signup = () => {
  const auth = getAuth(app)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [shopName, setShopName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async event => {
    event.preventDefault()

    const email = `${userId}@linkshop.com`

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        userId,
        email,
        shopName,
      })

      navigate('/')
    } catch (error) {}
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={onSubmit} className="signup-form">
        <div>
          <label>아이디</label>
          <input
            className="form-input"
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <div className="password-container">
            <input
              className="form-input"
              type={showPassword ? 'text' : 'password'}
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
        </div>
        <div>
          <label>상점 이름</label>
          <input
            className="form-input"
            type="text"
            value={shopName}
            onChange={e => setShopName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  )
}

export default Signup
