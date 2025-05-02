import { useState, useRef, useEffect } from 'react'

import Spinner from '../Spinner'
import { uploadImage } from '../../../api/api.js'
import { useWebpConverter } from '../../../hooks/useWebpConverter'

const EditRepItem = ({ data, onChange }) => {
  const [items, setItems] = useState([])
  const [loadingStates, setLoadingStates] = useState([])
  const bottomRef = useRef(null)
  const scrollableRef = useRef(null)
  const convertToWebP = useWebpConverter()

  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9)

  useEffect(() => {
    if (data && data.length > 0 && items.length === 0) {
      const initialized = data.map(item => ({
        id: item.id || generateId(),
        file: null,
        fileName: item.imageUrl?.split('/').pop() || '상품 이미지를 첨부해주세요',
        preview: null,
        imageUrl: item.imageUrl || '',
        productName: item.productName || item.name || '',
        productPrice: item.price ? String(item.price) : '',
      }))
      setItems(initialized)
      setLoadingStates(new Array(initialized.length).fill(false))
    }
  }, [data])

  useEffect(() => {
    onChange?.(items)
  }, [items])

  const handleImgChange = async (e, index) => {
    const file = e.target.files[0]
    if (!file) return

    setLoadingStates(prev => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })

    try {
      const webpFile = await convertToWebP(file)
      const imageUrl = await uploadImage(webpFile)

      setItems(prevItems =>
        prevItems.map((item, i) =>
          i === index
            ? {
                ...item,
                imageUrl,
                file: webpFile,
                fileName: file.name,
                preview: URL.createObjectURL(file),
              }
            : item
        )
      )
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
    } finally {
      setLoadingStates(prev => {
        const updated = [...prev]
        updated[index] = false
        return updated
      })
    }
  }

  const handleProductChange = (e, index) => {
    const { name, value } = e.target
    setItems(prevItems =>
      prevItems.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    )
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
    }

    setItems(prev => [...prev, newItem])
    setLoadingStates(prev => [...prev, false])
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
              <div className="content-file">
                <div className="rep-item-name">
                  <h5>상품 대표 이미지</h5>
                  <span className="content-comment">
                    {item.fileName || '상품 이미지를 첨부해주세요'}
                  </span>
                </div>
                <label htmlFor={`imgUpload-${item.id}`} className="add-file">
                  파일 첨부
                </label>
                <input
                  type="file"
                  id={`imgUpload-${item.id}`}
                  name="imgUrl"
                  onChange={e => handleImgChange(e, index)}
                  style={{ display: 'none' }}
                />
                {loadingStates[index] && <Spinner text="이미지 업로드 중..." />}
              </div>

              <div className="rep-item-name">
                <h5>상품 이름</h5>
                <input
                  className="rep-item-input"
                  type="text"
                  name="productName"
                  placeholder="상품 이름을 입력해주세요"
                  value={item.productName || ''}
                  onChange={e => handleProductChange(e, index)}
                />
              </div>

              <div className="rep-item-price">
                <h5>상품 가격</h5>
                <input
                  className="rep-item-input"
                  type="number"
                  name="productPrice"
                  placeholder="원화로 표기해주세요"
                  value={item.productPrice || ''}
                  onChange={e => {
                    const val = e.target.value
                    if (!isNaN(val) && Number(val) >= 0) {
                      handleProductChange(e, index)
                    }
                  }}
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

export default EditRepItem
