import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'

const Create = () => {
  //유나 create 코드 시작
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

    // 이름을 바꾼 File 객체 만들기
    const renamedFile = new File([file], safeFileName, { type: file.type })

    const uploadedUrl = await uploadImage(renamedFile) // fileName 넘기지 않아도 됨
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

  const [isLoading, setIsLoading] = useState(false) // 로딩 상태

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
      infoData.currentPassword // currentPassword 사용
    return isValid
  }

  const handleSubmit = async () => {
    // 필수 항목들에 대해 유효성 검사
    if (!infoData.name.trim() || !isItemsValid()) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    const payload = {
      shop: {
        imageUrl: items[0].imageUrl,
        urlName: infoData.shopUrl,
        shopUrl: infoData.shopUrl,
      },
      products: items.map(item => ({
        price: item.productPrice > 0 ? item.productPrice : 1000, // 가격이 0일 때 기본값 1000 설정
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

    try {
      await createShop(payload)
      sessionStorage.setItem('hasShop', 'true')
      setIsLoading(false) // 로딩 종료
      navigate('/') // 메인 페이지로 리디렉션
    } catch (error) {
      alert('등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  //유나 create 코드 끝

  return (
    <div className="create-wrap">
      <CreateMyshop
        infoData={infoData}
        setInfoData={setInfoData}
        items={items}
        setItems={setItems}
      />
      <CreateRepItem items={items} setItems={setItems} />

      {/* 버튼 활성화/비활성화 */}
      <button
        onClick={handleSubmit}
        className={`submit-btn ${isFormValid() ? 'enabled' : ''}`} // 활성화된 상태일 때 'enabled' 클래스 추가
        disabled={!isFormValid()} // 입력이 유효하지 않으면 버튼 비활성화
      >
        생성하기
      </button>
    </div>
  )
}

export default Create
