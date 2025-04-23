import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { ref, set } from 'firebase/database'

import app, { db } from '../firebase'

const Signup = () => {
  const auth = getAuth(app)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [shopName, setShopName] = useState('')

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

      console.log('User created and stored in DB:', user)
    } catch (error) {
      console.error('Error creating user:', error.message)
    }
  }

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>아이디</label>
          <input type="text" value={userId} onChange={e => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>상점 이름</label>
          <input
            type="text"
            value={shopName}
            onChange={e => setShopName(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default Signup
