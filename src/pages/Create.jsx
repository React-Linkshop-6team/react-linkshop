import React, { useState, useEffect } from 'react'
import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const [passwordChecked, setPasswordChecked] = useState(false) // 비밀번호 확인 상태

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
    currentPassword: '', // 비밀번호를 currentPassword로 초기화
  })

  // ✅ 비밀번호가 유효한 형식일 때 자동으로 passwordChecked true 설정
  useEffect(() => {
    const isValid =
      infoData.currentPassword.length >= 6 &&
      /\d/.test(infoData.currentPassword) &&
      /[a-zA-Z]/.test(infoData.currentPassword)

    setPasswordChecked(isValid)
  }, [infoData.currentPassword])

  // 입력된 아이템들이 모두 유효한지 체크하는 함수
  const isItemsValid = () => {
    return items.every(item => item.imageUrl && item.productName && item.productPrice)
  }

  // 입력이 모두 유효한지 체크하는 함수
  const isFormValid = () => {
    const trimmedName = infoData.name.trim()
    const result =
      trimmedName &&
      isItemsValid() &&
      infoData.shopUrl &&
      infoData.userId &&
      infoData.currentPassword &&
      passwordChecked

    // ✅ 콘솔 로그로 디버깅 추가
    console.log('===== [isFormValid] 체크 =====')
    console.log('trimmedName:', trimmedName)
    console.log('isItemsValid:', isItemsValid())
    console.log('shopUrl:', infoData.shopUrl)
    console.log('userId:', infoData.userId)
    console.log('currentPassword:', infoData.currentPassword)
    console.log('passwordChecked:', passwordChecked)
    console.log('전체 유효성 결과:', !!result)
    console.log('=============================')

    return result
  }

  const handleSubmit = async () => {
    if (!infoData.name.trim() || !isItemsValid()) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    // 비밀번호 유효성 검사
    const isPasswordValid =
      infoData.currentPassword.length >= 6 &&
      /\d/.test(infoData.currentPassword) &&
      /[a-zA-Z]/.test(infoData.currentPassword)

    if (!isPasswordValid) {
      alert('비밀번호는 영문 + 숫자 포함 6자 이상이어야 합니다.')
      return
    }

    // 아이디 유효성 검사 (특수문자/공백 제거)
    const isUserIdValid = /^[a-zA-Z0-9]+$/.test(infoData.userId)
    if (!isUserIdValid) {
      alert('유저 ID는 영문 또는 숫자만 사용 가능합니다.')
      return
    }

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
      password: infoData.currentPassword,
      userId: infoData.userId,
      name: infoData.name.trim(),
    }

    try {
      await createShop(payload)
      navigate('/')
    } catch (error) {
      alert('등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

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
        className={`submit-btn ${isFormValid() ? 'enabled' : ''}`}
        disabled={!isFormValid()}
      >
        생성하기
      </button>
    </div>
  )
}

export default Create
