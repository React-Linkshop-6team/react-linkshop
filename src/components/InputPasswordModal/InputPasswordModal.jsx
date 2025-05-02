import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getShopById, putShopById } from '../../api/api'
import Spinner from '../common/Spinner'
import eyes from '../../assets/images/eyes.png'

const InputPasswordModal = ({ id, onClose }) => {
  const [password, setPassword] = useState('')
  const [shopData, setShopData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShopById(id)
      if (data) {
        setShopData(data)
      } else {
        alert('상점 정보를 가져오는데 실패했습니다.')
      }
    }

    fetchData()
  }, [id])

  const handleClickPassword = async e => {
    e.preventDefault()

    if (!shopData) return

    setIsLoading(true)

    try {
      const updatedData = {
        currentPassword: password,
        name: shopData.name,
        userId: shopData.userId,
        shop: {
          imageUrl: shopData.shop?.imageUrl,
          urlName: shopData.shop?.urlName,
          shopUrl: shopData.shop?.shopUrl,
        },
        products: shopData.products?.map(product => ({
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        })),
      }

      const result = await putShopById(id, updatedData)

      if (result) {
        alert('비밀 번호가 일치합니다!')
        navigate(`/edit/${id}`)
      } else {
        alert('비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('비밀번호가 맞지 않습니다.')
      } else {
        alert('오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = e => {
    e.preventDefault()
    onClose()
  }

  if (isLoading) {
    return <Spinner text="비밀번호 확인 중입니다..." />
  }

  return (
    <form className="password-modal">
      <input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: 'none' }}
        tabIndex={-1}
      />
      <p className="password-messege">비밀번호를 입력해주세요 🙏</p>
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
          <img src={eyes} alt="비밀번호 보기" />
        </button>
      </div>

      <div className="check-delete-button">
        <button type="submit" className="check-button" onClick={handleClickPassword}>
          확인
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </form>
  )
}

export default InputPasswordModal
