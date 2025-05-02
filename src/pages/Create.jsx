import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
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

    const auth = getAuth()
    const user = auth.currentUser

    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    const email = `${infoData.userId}@linkshop.com`
    const password = infoData.currentPassword

    if (user.email !== email) {
      alert('입력한 ID가 현재 로그인된 계정과 일치하지 않습니다.')
      return
    }

    const credential = EmailAuthProvider.credential(email, password)

    try {
      await reauthenticateWithCredential(user, credential)

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
        password,
        userId: infoData.userId,
        name: infoData.name.trim(),
      }

      await createShop(payload)
      sessionStorage.setItem('hasShop', 'true')
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      alert('비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="create-wrap">
      <CreateMyshop
        infoData={infoData}
        setInfoData={setInfoData}
        shopImageUrl={shopImageUrl}
        setShopImageUrl={setShopImageUrl}
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
