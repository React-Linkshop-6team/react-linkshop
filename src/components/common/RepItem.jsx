import React, { useState, useRef, useEffect } from 'react'
import RepItemImageUploader from './RepItemImageUploader'
import { useNavigate } from 'react-router-dom'

const RepItem = () => {
  const navigate = useNavigate()

  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9)

  const [items, setItems] = useState([
    {
      id: generateId(),
      file: null,
      fileName: '상품 이미지를 첨부해주세요',
      preview: null,
      productName: '',
      productPrice: '',
      isSubmitted: false,
    },
  ])

  const TEAM_ID = 15
  const PAGE_ID = 6
  const fullTeamId = `${TEAM_ID}-${PAGE_ID}`

  const uploadImage = async file => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('https://linkshop-api.vercel.app/images/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('업로드 실패')
      }

      const data = await res.json()
      return data.url
    } catch (error) {
      console.error('이미지 업로드 실패', error)
      return null
    }
  }

  const bottomRef = useRef(null)

  const handleChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    setItems(updatedItems)
  }

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      const uploadedUrl = await uploadImage(file)

      if (!uploadedUrl) {
        alert('이미지 업로드에 실패했습니다.')
        return
      }

      const updatedItems = [...items]
      updatedItems[index].file = file
      updatedItems[index].fileName = file.name
      updatedItems[index].preview = previewUrl
      updatedItems[index].imageUrl = uploadedUrl
      setItems(updatedItems)
    }
  }

  const handleAddItem = () => {
    const newItem = {
      id: generateId(),
      file: null,
      fileName: '상품 이미지를 첨부해주세요',
      preview: null,
      productName: '',
      productPrice: '',
      isSubmitted: false,
    }
    setItems(prev => [...prev, newItem])
  }

  const handleSubmit = async () => {
    console.log('🔔 생성하기 버튼 클릭됨')

    const notYetSubmittedItems = items.filter(item => !item.isSubmitted)

    const isValid = notYetSubmittedItems.every(
      item => item.imageUrl && item.productName && item.productPrice
    )
    if (!isValid) {
      alert('모든 항목을 입력해주세요!')
      return
    }

    try {
      const payload = {
        teamId: TEAM_ID,
        products: notYetSubmittedItems.map(item => ({
          name: item.productName,
          imageUrl: item.imageUrl,
          price: Number(item.productPrice),
        })),
      }

      console.log('payload 확인:', JSON.stringify(payload, null, 2))

      const res = await fetch(`https://linkshop-api.vercel.app/${fullTeamId}/linkshops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      console.log('📦 response:', res)

      if (!res.ok) {
        const errorData = await res.json()
        console.error('❌ 서버 에러 응답:', errorData)
        throw new Error('샵 생성 실패')
      }

      const data = await res.json()
      console.log('🎯 서버 응답:', data)

      const linkId = data.id || data.shop?.id
      if (!linkId) {
        alert('링크 ID를 찾을 수 없습니다.')
        return
      }

      navigate(`/link/${linkId}`)
    } catch (error) {
      console.error('❌ 샵 생성 실패:', error)
      alert('샵 생성에 실패했습니다.')
    }
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [items])

  return (
    <div className="repitem-txt-wrap">
      <div className="repitem-txt">
        <h5>대표 상품</h5>
        <h5 className="add-item" onClick={handleAddItem}>
          추가
        </h5>
      </div>

      <div className="repitem-list">
        {items.map((item, index) => (
          <div key={item.id} className="repitem-wrap">
            <div className="item-input-wrap">
              <RepItemImageUploader
                fileName={item.fileName}
                onImageUpload={e => handleImageUpload(index, e)}
                id={item.id}
              />
              <div className="rep-item-name">
                <h5>상품 이름</h5>
                <input
                  className="rep-item-input"
                  type="text"
                  placeholder="상품 이름을 입력해주세요"
                  value={item.productName}
                  onChange={e => handleChange(index, 'productName', e.target.value)}
                />
              </div>
              <div className="rep-item-price">
                <h5>상품 가격</h5>
                <input
                  className="rep-item-input"
                  type="number"
                  placeholder="원화로 표기해주세요"
                  value={item.productPrice}
                  onChange={e => handleChange(index, 'productPrice', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <button onClick={handleSubmit} className="submit-btn">
        생성하기
      </button>
    </div>
  )
}

export default RepItem
