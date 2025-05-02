import React from 'react'

const RepItemImageUploader = ({ fileName, onImageUpload, id, title = '상품 대표 이미지' }) => {
  return (
    <div className="rep-item-img">
      <h5>{title}</h5>
      <div className="file-upload-box">
        <span className="file-text">{fileName}</span>
        <label htmlFor={`imgUpload-${id}`} className="file-upload-btn">
          파일 첨부
        </label>
        <input
          id={`imgUpload-${id}`}
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

export default RepItemImageUploader
