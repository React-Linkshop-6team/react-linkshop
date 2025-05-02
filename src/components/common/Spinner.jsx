import React from 'react'
import loadingImage from '../../assets/images/linkshop.png'

const Spinner = ({ text = '샵 정보를 가져오는 중 입니다...' }) => {
  return (
    <div className="spinner-container">
      <img src={loadingImage} alt="로딩 중" className="spinner-image" />
      <div className="spinner-text">{text}</div>
    </div>
  )
}

export default Spinner
