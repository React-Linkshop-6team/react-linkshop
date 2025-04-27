import { useState, useRef } from 'react'

import Eyes from '../../../assets/images/eyes.png'
import EyeClick from '../../../assets/images/eyeClick.png'
// import uploadImage from '../../../api/api.js'

const CreateShopInfo = ({ infoData, setInfoData }) => {
  // 비밀번호 보기 토글
  const [showPassword, setShowPassword] = useState(false)
  // 이미지 파일 상태
  const [imgFile, setImgFile] = useState(null)

  const inputRef = useRef(null)

  // 입력 값 변경 핸들러
  const handleChange = e => {
    const { name, value } = e.target

    // 비밀번호 입력 시 currentPassword만 업데이트
    if (name === 'password') {
      setInfoData(prev => ({
        ...prev,
        currentPassword: value, // currentPassword로 업데이트
      }))
    } else {
      setInfoData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // 이미지 변경 핸들러
  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)
      setInfoData(prev => ({
        ...prev,
        imageUrl, // 업로드된 이미지 URL을 infoData에 저장
      }))
      setImgFile(file)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
    }
  }

  // 비밀번호 보이기/숨기기 토글
  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="info-section">
      {/* 이미지 업로드 */}

      {/* 이름 */}
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

      {/* URL */}
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

      {/* 유저 ID */}
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

      {/* 비밀번호 */}
      <div className="user-info">
        <div className="content-box">
          <span className="content-title">비밀번호</span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password" // 'password' name을 사용
            value={infoData.currentPassword || ''} // currentPassword로 설정
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
