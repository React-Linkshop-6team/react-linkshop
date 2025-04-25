import React, { useState } from 'react'
import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/common/Spinner'
const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [shopUrl, setShopUrl] = useState('')
  const [inputUserId, setInputUserId] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const [items, setItems] = useState([
    {
      id: Date.now(),
      file: null,
      fileName: '상품 이미지를 첨부해주세요',
      preview: null,
      imageUrl: '',
      productName: '',
      productPrice: '',
      isSubmitted: false,
    },
  ])

  const [infoData, setInfoData] = useState({
    name: '',
    shopUrl: '',
    userId: '',
    currentPassword: '', // currentPassword로 수정
  })

  const [isLoading, setIsLoading] = useState(false) // 로딩 상태

  const isItemsValid = () => {
    return items.every(item => {
      const isValid =
        item.imageUrl && item.productName && item.productPrice && item.productPrice > 0
      console.log(`아이템 ${item.id} 유효성:`, isValid)
      return isValid
    })
  }

  const isFormValid = () => {
    const trimmedName = infoData.name.trim()
    const isValid =
      trimmedName &&
      isItemsValid() &&
      infoData.shopUrl &&
      infoData.userId &&
      infoData.currentPassword
    return isValid
  }

  const handleSubmit = async () => {
    if (!infoData.name.trim() || !isItemsValid()) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    setIsLoading(true) // 로딩 시작

    const payload = {
      shop: {
        imageUrl: items[0].imageUrl,
        urlName: infoData.shopUrl,
        shopUrl: infoData.shopUrl,
      },
      products: items.map(item => ({
        price: item.productPrice > 0 ? item.productPrice : 1000,
        imageUrl: item.imageUrl,
        name: item.productName,
      })),
      password:
        infoData.currentPassword.length >= 6 &&
        /\d/.test(infoData.currentPassword) &&
        /[a-zA-Z]/.test(infoData.currentPassword)
          ? infoData.currentPassword
          : 'admin123',
      userId: infoData.userId.match(/^[a-zA-Z0-9]+$/) ? infoData.userId : 'admin1234',
      name: infoData.name.trim(),
    }

    try {
      await createShop(payload)
      setIsLoading(false) // 로딩 종료
      navigate('/') // 메인 페이지로 리디렉션
    } catch (error) {
      setIsLoading(false) // 로딩 종료
      alert('등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="create-wrap">
      {/* 로딩 중일 때 Spinner 표시 */}
      {isLoading && <Spinner text="샵을 생성하는 중입니다..." />}

      <CreateMyshop
        infoData={infoData}
        setInfoData={setInfoData}
        items={items}
        setItems={setItems}
      />
      <CreateRepItem items={items} setItems={setItems} />

      <button
        onClick={handleSubmit}
        className={`submit-btn ${isFormValid() ? 'enabled' : ''}`}
        disabled={!isFormValid()}
      >
        생성하기
      </button>
    </div>
  )
}

export default Create
