import { useState, useRef } from 'react'

import Eyes from '../../../assets/images/eyes.webP'
import EyeClick from '../../../assets/images/eyeClick.webP'

const CreateShopInfo = ({ infoData, setInfoData }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [imgFile, setImgFile] = useState(null)

  const inputRef = useRef(null)

  const handleChange = e => {
    const { name, value } = e.target

    if (name === 'password') {
      setInfoData(prev => ({
        ...prev,
        currentPassword: value,
      }))
    } else {
      setInfoData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)
      setInfoData(prev => ({
        ...prev,
        imageUrl,
      }))
      setImgFile(file)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
    }
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

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

      <div className="content-box">
        <span className="content-title">유저 ID</span>
        <input
          type="text"
          name="userId"
          value={infoData.userId}
          onChange={handleChange}
          placeholder="유저 ID를 입력해주세요"
          className="content-comment"
        />
      </div>

      <div className="user-info">
        <div className="content-box">
          <span className="content-title">비밀번호</span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={infoData.currentPassword || ''}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            className="content-comment"
          />
        </div>
        <img
          src={showPassword ? EyeClick : Eyes}
          alt="비밀번호 보기"
          className="password-eyes"
          onClick={togglePassword}
        />
      </div>
    </div>
  )
}

export default CreateShopInfo
