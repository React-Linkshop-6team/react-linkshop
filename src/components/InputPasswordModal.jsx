import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getShopById, putShopById } from '../api/api'

const InputPasswordModal = ({ id, onClose }) => {
  const [password, setPassword] = useState('')
  const [shopData, setShopData] = useState({})
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
        autoComplete="new-passward"
      />
      <button className="check-button" onClick={handleClickPassword}>
        확인
      </button>
      <button className="cancel-button" onClick={onClose}>
        취소
      </button>
    </form>
  )
}

export default InputPasswordModal
