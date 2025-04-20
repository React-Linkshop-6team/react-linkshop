import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InputPasswordModal = () => {
  const [password, setPassword] = useState('')
  const goEdit = useNavigate()

  const handleClickPassword = () => {
    if (password === 'asdd') {
      goEdit('/edit')
    } else {
      alert('비밀번호를 확인해주세요.')
    }
  }

  return (
    <section className="password-modal">
      <p className="password-messege">비밀번호를 입력해주세요 🙏</p>
      <input
        className="input-password"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="check-button" onClick={handleClickPassword}>
        확인
      </button>
    </section>
  )
}

export default InputPasswordModal
