import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'
import Spinner from '../Spinner'

const RepItem = ({ items, setItems }) => {
  const [linkId, setLinkId] = useState('')
  const [loadingItems, setLoadingItems] = useState([]) // 로딩 상태를 추적할 배열
  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9)
  const bottomRef = useRef(null)
  const navigate = useNavigate()
  const scrollableRef = useRef(null)

  const handleImageUpload = async (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)

      // 이미지 업로드 처리 전에 로딩 상태 업데이트
      setLoadingItems(prev => [...prev, index]) // 로딩 상태 추가

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

        // 로딩 상태 제거
        setLoadingItems(prev => prev.filter(itemIndex => itemIndex !== index))
      } catch (err) {
        console.error('❌ 업로드 중 에러:', err)
        alert('이미지 업로드에 실패했습니다.')
        // 로딩 상태 제거
        setLoadingItems(prev => prev.filter(itemIndex => itemIndex !== index))
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
              {/* CreateRepItemImageUploader와 Spinner이 함께 보이도록 조정 */}
              <div className="image-uploader-wrap" style={{ position: 'relative' }}>
                {/* 로딩 중일 때만 Spinner 표시 */}
                {loadingItems.includes(index) && <Spinner text="사진 업로드 중입니다..." />}
                <CreateRepItemImageUploader
                  fileName={item.fileName}
                  onImageUpload={e => handleImageUpload(index, e)}
                  id={item.id}
                />
              </div>

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
