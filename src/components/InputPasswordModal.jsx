import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getShopById, putShopById } from '../api/api'
import Spinner from './common/Spinner'

const InputPasswordModal = ({ id, onClose }) => {
  const [password, setPassword] = useState('')
  const [shopData, setShopData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
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
      console.error(error.response?.data || error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = e => {
    e.preventDefault()
    onClose()
  }

  if (isLoading || isCancelling) {
    return <Spinner text={isCancelling ? '취소 중입니다...' : '비밀번호 확인 중입니다...'} />
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
      <div className="check-delete-button">
        <button className="check-button" onClick={handleClickPassword}>
          확인
        </button>
        <button
          className="cancel-button"
          onClick={handleCancel} // 수정된 취소 로직
        >
          취소
        </button>
      </div>
    </form>
  )
}

export default InputPasswordModal
