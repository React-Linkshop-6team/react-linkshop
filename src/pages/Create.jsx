import React, { useState } from 'react'
import CreateRepItem from '../components/common/Create/CreateRepItem'
import CreateMyshop from '../components/common/Create/CreateMyshop'
import { createShop } from '../api/api'
import { uploadImage } from '../api/api' // 이미지 업로드 함수 가져오기

const Create = () => {
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

    try {
      await createShop(payload)
      alert('등록이 완료되었습니다.')
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
      <CreateRepItem
        items={items}
        setItems={setItems}
        onImageUpload={handleImageUpload} // 이미지 업로드 핸들러를 props로 전달
      />

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
