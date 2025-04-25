//삭제하기 기능을 사용할 때 비밀번호를 입력받는 컴포넌트.

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { deleteShop } from '../api/api'

const CheckDeletePageModal = ({ onClose }) => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const handleClickDeletePassword = async e => {
    e.preventDefault()

    if (!password) {
      alert('비밀번호를 입력해주세요.')
      return
    }

    try {
      const result = await deleteShop(id, password)

      if (result) {
        alert('삭제가 완료되었습니다.')
        navigate('/')
        onClose?.()
      } else {
        alert('삭제에 실패했습니다. 비밀번호를 다시 확인해주세요.')
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        alert('오류가 발생했습니다.')
      }
      console.error(error.response?.data || error)
    }
  }

  return (
    <form className="password-modal">
      <p className="password-messege">비밀번호를 입력해주세요 🙏</p>
      <input
        className="input-password"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <button className="check-button" onClick={handleClickDeletePassword}>
        삭제
      </button>
      <button className="cancel-button" onClick={onClose}>
        취소
      </button>
    </form>
  )
}

export default CheckDeletePageModal
