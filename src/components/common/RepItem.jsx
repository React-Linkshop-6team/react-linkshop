import React, { useState } from 'react'

const RepItem = () => {
  const [fileName, setFileName] = useState('상품 이미지를 첨부해주세요') // 기본 텍스트 설정
  const [preview, setPreview] = useState(null) //미리보기
  const [file, setFile] = useState(null) // 사진 파일 등록
  const [productName, setProductName] = useState('') // 상품 이름 등록
  const [productPrice, setProductPrice] = useState('') //상품 가격 등록

  const handleImageUpload = e => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setPreview(URL.createObjectURL(uploadedFile))
      setFileName(uploadedFile.name)
      setFile(uploadedFile)
    }
  }

  const handleSubmit = () => {
    if (!file || !productName || !productPrice) {
      alert('모든 항목을 입력해주세요!')
      return
    }

    const formData = {
      fileName,
      preview,
      productName,
      productPrice,
    }
    console.log('등록된 상품 정보:', formData)

    // 서버로 전송
    // const form = new FormData()
    // form.append('image', file)
    // form.append('name', productName)
    // form.append('price', productPrice)
    // fetch('/api/product', {
    //   method: 'POST',
    //   body: form,
    // })
  }

  return (
    <div className="repitem-wrap">
      <div className="repitem-txt">
        <h5>대표 상품</h5>
        <h5>추가</h5>
      </div>
      <div className="item-input-wrap">
        <div className="rep-item-img">
          <h5>상품 대표 이미지</h5>
          <div className="file-upload-box">
            <span className="file-text">{fileName}</span>
            <label htmlFor="imgUpload" className="file-upload-btn">
              파일 첨부
            </label>
            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }}
            />
          )}
        </div>

        <div className="rep-item-name">
          <h5>상품 이름</h5>
          <input
            type="text"
            placeholder="상품 이름을 등록하세요"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </div>

        <div className="rep-item-price">
          <h5>상품 가격</h5>
          <input
            type="number"
            placeholder="예: 4900"
            value={productPrice}
            onChange={e => setProductPrice(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ 등록 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit} className="submit-btn">
          등록
        </button>
      </div>
    </div>
  )
}

export default RepItem
