import React, { useState } from 'react'
import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'

const Create = () => {
  //유나 create 코드 시작
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

  // 입력된 아이템들이 모두 유효한지 체크하는 함수
  const isItemsValid = () => {
    return items.every(item => item.imageUrl && item.productName && item.productPrice)
  }

  // 입력이 모두 유효한지 체크하는 함수
  const isFormValid = () => {
    const trimmedName = infoData.name.trim()
    return trimmedName && isItemsValid() && infoData.shopUrl && infoData.userId && infoData.password
  }

  const handleSubmit = async () => {
    // 필수 항목들에 대해 유효성 검사
    if (!infoData.name.trim() || !isItemsValid()) {
      alert('모든 정보를 입력해주세요.')
      return
    }

    // payload 내용에서 가격 0 체크, password와 userId 유효성 체크
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
          : 'admin123', // 영문+숫자 6자 이상
      userId: infoData.userId.match(/^[a-zA-Z0-9]+$/) ? infoData.userId : 'admin1234', // 특수문자, 공백 없는지 체크
      name: infoData.name.trim(),
    }

    try {
      await createShop(payload)
      alert('등록이 완료되었습니다.')
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
