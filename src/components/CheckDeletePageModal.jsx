import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteShop } from '../api/api'
import Spinner from './common/Spinner'
import eyes from '../assets/images/eyes.png'

const CheckDeletePageModal = ({ onClose, id }) => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleClickDeletePassword = async e => {
    e.preventDefault()

    if (!password) {
      alert('비밀번호를 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const result = await deleteShop(id, password)

      if (result) {
        alert('삭제가 완료되었습니다.')
        onClose?.()
        navigate('/')
      } else {
        alert('삭제에 실패했습니다. 비밀번호를 다시 확인해주세요.')
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        alert('오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form className="password-modal">
      <p className="password-message">비밀번호를 입력해주세요 🙏</p>
      <div className="password-input-container">
        <input
          className="input-password"
          placeholder="비밀번호를 입력해주세요."
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="show-password-toggle"
          onClick={() => setShowPassword(prev => !prev)}
        >
          <img src={eyes} alt="비밀번호 보기" width="20" height="20" />
        </button>
      </div>

      <div className="check-delete-button">
        <button className="check-button" onClick={handleClickDeletePassword}>
          삭제
        </button>
        <button className="cancel-button" type="button" onClick={onClose}>
          취소
        </button>
      </div>
    </form>
  )
}

export default CheckDeletePageModal
