import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'

const RepItem = ({ items, setItems }) => {
  // 유나 repItemcreate 코드 시작
  const [linkId, setLinkId] = useState('')
  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9)
  const bottomRef = useRef(null)
  const navigate = useNavigate()
  const scrollableRef = useRef(null)

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)

      // 하드코딩된 URL을 사용하여 이미지 업로드 처리
      const formData = new FormData()
      formData.append('image', file)

      try {
        const res = await fetch('https://linkshop-api.vercel.app/images/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) throw new Error('이미지 업로드 실패')

        const data = await res.json()
        const uploadedUrl = data.url // 서버로부터 받은 이미지 URL

        const updatedItems = [...items]
        updatedItems[index] = {
          ...updatedItems[index],
          file,
          fileName: file.name,
          preview: previewUrl,
          imageUrl: uploadedUrl,
        }
        setItems(updatedItems)
      } catch (err) {
        console.error('❌ 업로드 중 에러:', err)
        alert('이미지 업로드에 실패했습니다.')
      }
    }
  }

  const handleChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    setItems(updatedItems)
  }

  const handleAddItem = () => {
    if (items.length >= 3) {
      alert('최대 3개의 상품만 추가할 수 있습니다.')
      return
    }

    const newItem = {
      id: generateId(),
      file: null,
      fileName: '상품 이미지를 첨부해주세요',
      preview: null,
      imageUrl: '',
      productName: '',
      productPrice: '',
      isSubmitted: false,
    }
    setItems(prev => [...prev, newItem])
  }

  const handleCreateShop = () => {
    const generatedLinkId = generateId()
    setLinkId(generatedLinkId)
    navigate(`/link/${generatedLinkId}`)
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [items])
  // 유나 repItemcreate 코드 끝

  return (
    <div className="repitem-txt-wrap">
      <div className="repitem-txt">
        <h5>대표 상품</h5>
        <h5 className="add-item" onClick={handleAddItem}>
          추가
        </h5>
      </div>

      <div className="repitem-list" ref={scrollableRef}>
        {items.map((item, index) => (
          <div key={item.id} className="repitem-wrap">
            <div className="item-input-wrap">
              <CreateRepItemImageUploader
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
    </div>
  )
}

export default RepItem
