import React, { useState, useRef, useEffect } from 'react'

const RepItem = () => {
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
    // {
    //   id: generateId(),
    //   file: null,
    //   fileName: '상품 이미지를 첨부해주세요',
    //   preview: null,
    //   productName: '',
    //   productPrice: '',
    //   isSubmitted: false,
    // },
  ])

  const bottomRef = useRef(null)

  const handleChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    setItems(updatedItems)
  }

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const updatedItems = [...items]
      updatedItems[index].file = file
      updatedItems[index].fileName = file.name
      updatedItems[index].preview = URL.createObjectURL(file)
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

  const handleSubmit = () => {
    const notYetSubmittedItems = items.filter(item => !item.isSubmitted)

    const isValid = notYetSubmittedItems.every(
      item => item.file && item.productName && item.productPrice
    )
    if (!isValid) {
      alert('모든 항목을 입력해주세요!')
      return
    }

    console.log('등록된 상품들:', notYetSubmittedItems)

    // 등록된 상태로 표시
    const updatedItems = items.map(item =>
      notYetSubmittedItems.includes(item) ? { ...item, isSubmitted: true } : item
    )
    setItems(updatedItems)
  }

  // 🔽 스크롤 아래로 이동
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [items])

  return (
    <div className="repitem-txt-wrap">
      {/* 상단 제목 + 추가 버튼 */}
      <div className="repitem-txt">
        <h5>대표 상품</h5>
        <h5 className="add-item" onClick={handleAddItem}>
          추가
        </h5>
      </div>

      {/* 상품 리스트 */}
      <div className="repitem-list">
        {items.map((item, index) => {
          return (
            <div key={item.id} className="repitem-wrap">
              <div className="item-input-wrap">
                <div className="rep-item-img">
                  <h5>상품 대표 이미지</h5>
                  <div className="file-upload-box">
                    <span className="file-text">{item.fileName}</span>
                    <label htmlFor={`imgUpload-${item.id}`} className="file-upload-btn">
                      파일 첨부
                    </label>
                    <input
                      id={`imgUpload-${item.id}`}
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(index, e)}
                      style={{ display: 'none' }}
                    />
                  </div>
                  {/* 이미지 프리뷰 필요시 코드 주석 해제 */}
                  {/* {item.preview && <img className="img-preview" src={item.preview} alt="preview" />} */}
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
                    type="text"
                    placeholder="원화로 표기해주세요"
                    value={item.productPrice}
                    onChange={e => handleChange(index, 'productPrice', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )
        })}
        {/* 스크롤 위치 기준점 */}
        <div ref={bottomRef} />
      </div>
      {/* 생성하기 버튼 */}
      <button onClick={handleSubmit} className="submit-btn">
        생성하기
      </button>
    </div>
  )
}

export default RepItem
