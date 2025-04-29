import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'

const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [shopUrl, setShopUrl] = useState('')
  const [inputUserId, setInputUserId] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [shopImageUrl, setShopImageUrl] = useState('')

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
    password: '',
  })

  useEffect(() => {
    const stateUserId = location.state?.userId
    const statePassword = location.state?.password

    if (stateUserId && statePassword) {
      setInfoData(prev => ({
        ...prev,
        userId: stateUserId,
        password: statePassword,
      }))
    } else if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(sessionStorage.getItem('linkshopUser'))
      if (storedUser?.userId && storedUser?.password) {
        setInfoData(prev => ({
          ...prev,
          userId: storedUser.userId,
          password: storedUser.password,
        }))
      }
    }
  }, [location])

  const handleImageUpload = async (file, index) => {
    if (!file) return

    const safeFileName = `${uuidv4()}.${file.name.split('.').pop()}`

    const renamedFile = new File([file], safeFileName, { type: file.type })

    const uploadedUrl = await uploadImage(renamedFile)
    if (!uploadedUrl) {
      alert('이미지 업로드 실패')
      return
    }

    const updatedItems = [...items]
    updatedItems[index] = {
      ...updatedItems[index],
      fileName: safeFileName,
      imageUrl: uploadedUrl,
    }
    setItems(updatedItems)
  }

  const [isLoading, setIsLoading] = useState(false)

  const isItemsValid = () => {
    return items.every(item => {
      const isValid =
        item.imageUrl && item.productName && item.productPrice && item.productPrice > 0

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

    const payload = {
      shop: {
        imageUrl: shopImageUrl,
        urlName: infoData.shopUrl,
        shopUrl: infoData.shopUrl,
      },
      products: items.map(item => ({
        price: item.productPrice > 0 ? item.productPrice : 1000,
        imageUrl: item.imageUrl,
        name: item.productName,
      })),
      password:
        infoData.password.length >= 6 &&
        /\d/.test(infoData.password) &&
        /[a-zA-Z]/.test(infoData.password)
          ? infoData.password
          : 'admin123',
      userId: infoData.userId.match(/^[a-zA-Z0-9]+$/) ? infoData.userId : 'admin1234',
      name: infoData.name.trim(),
    }

    console.log('🚀 생성 요청 payload:', JSON.stringify(payload, null, 2))

    try {
      await createShop(payload)
      sessionStorage.setItem('hasShop', 'true')
      setIsLoading(false)
      navigate('/')
    } catch (error) {}
  }

  return (
    <div className="create-wrap">
      <CreateMyshop
        infoData={infoData}
        setInfoData={setInfoData}
        items={items}
        setItems={setItems}
        shopImageUrl={shopImageUrl}
        setShopImageUrl={setShopImageUrl}
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
