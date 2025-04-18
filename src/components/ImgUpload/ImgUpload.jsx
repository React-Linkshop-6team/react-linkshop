import { useRef } from 'react'

const ImgUpload = ({ values, onChange }) => {
  const inputRef = useRef(null)

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
        <span className="content-comment">
          {values.imgFile ? values.imgFile.name : '상품 이미지를 첨부해주세요'}
        </span>
      </div>
      <label htmlFor={`imgUpload`} className="add-file">
        파일 첨부
      </label>
      <input
        type="file"
        id="imgUpload"
        name="imgFile"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImgUpload
