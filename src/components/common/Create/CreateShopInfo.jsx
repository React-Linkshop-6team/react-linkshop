import React, { useState } from 'react'
import Eyes from '../../../assets/images/eyes.png'

const InfoInput = ({ infoData, setInfoData }) => {
  // 유나 shopInfo 코드 시작
  const [showId, setShowId] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setInfoData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleId = () => {
    setShowId(prev => !prev)
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }
  // 유나 shopInfo 코드 끝
  return (
    <div className="info-section">
      <div className="content-box">
        <span className="content-title">이름</span>
        <input
          type="text"
          name="name"
          value={infoData.name}
          onChange={handleChange}
          placeholder="표시하고 싶은 이름을 적어 주세요"
          className="content-comment"
        />
      </div>
      <div className="content-box">
        <span className="content-title">Url</span>
        <input
          type="url"
          name="shopUrl"
          value={infoData.shopUrl}
          onChange={handleChange}
          placeholder="Url을 입력해주세요"
          className="content-comment"
        />
      </div>
      <div className="user-info">
        <div className="content-box">
          <span className="content-title">유저 ID</span>
          <input
            type={showId ? 'text' : 'password'}
            name="userId"
            value={infoData.userId}
            onChange={handleChange}
            placeholder="유저 ID를 입력해주세요"
            className="content-comment"
          />
        </div>
        <img src={Eyes} alt="아이디 보기" className="password-eyes" onClick={toggleId} />
      </div>
      <div className="user-info">
        <div className="content-box">
          <span className="content-title">비밀번호</span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={infoData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            className="content-comment"
          />
        </div>
        <img src={Eyes} alt="비밀번호 보기" className="password-eyes" onClick={togglePassword} />
      </div>
    </div>
  )
}

export default InfoInput
