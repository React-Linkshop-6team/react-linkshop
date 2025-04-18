import { useRef } from 'react'

const ImgUpload = ({ values, onChange }) => {
  const inputRef = useRef(null)

  const handleClick = e => {
    inputRef.current.click()
  }

  const handleChange = e => {
    const file = e.target.files[0]
    if (file) {
      onChange('imgFile', file)
      console.log(file)
    }
  }

  return (
    <div className="content-file">
      <div className="content-box">
        <span className="content-title">상품 대표 이미지</span>
        <span className="content-comment">상품 이미지를 첨부해주세요</span>
      </div>
      <button type="button" onClick={handleClick} className="add-file">
        파일 선택
      </button>
      <input
        type="file"
        name="imgFile"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImgUpload
