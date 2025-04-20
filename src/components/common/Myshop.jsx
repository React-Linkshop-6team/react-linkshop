import React, { useState, useRef } from 'react'
import Eyes from '../../assets/images/eyes.png'

const Myshop = () => {
  const [values, setValues] = useState({
    imgFile: null,
  })

  const [infoData, setInfoData] = useState({
    name: '',
    shopUrl: '',
    userId: '',
    password: '',
  })

  const [showId, setShowId] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = useRef(null)

  const handleImgChange = e => {
    const file = e.target.files[0]
    if (file) {
      setValues(prev => ({
        ...prev,
        imgFile: file,
      }))
      console.log(file)
    }
  }

  const handleInfoChange = e => {
    const { name, value } = e.target
    setInfoData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(infoData, values)
  }

  const toggleId = () => setShowId(prev => !prev)
  const togglePassword = () => setShowPassword(prev => !prev)

  return (
    <div className="my-item-shop">
      <div className="shop">
        <span className="my-item">내 쇼핑몰</span>
        <div className="item-content">
          {/* 이미지 업로드 */}

          <form onSubmit={handleSubmit} className="form">
            <div className="content-file">
              <div className="content-box">
                <span className="content-title">상품 대표 이미지</span>
                <span className="content-comment">
                  {values.imgFile ? values.imgFile.name : '상품 이미지를 첨부해주세요'}
                </span>
              </div>
              <label htmlFor="imgUpload" className="add-file">
                파일 첨부
              </label>
              <input
                type="file"
                id="imgUpload"
                name="imgFile"
                ref={inputRef}
                onChange={handleImgChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* 정보 입력 */}
            <div className="content-box">
              <span className="content-title">이름</span>
              <input
                type="text"
                name="name"
                value={infoData.name}
                onChange={handleInfoChange}
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
                onChange={handleInfoChange}
                placeholder="Url을 입력해주세요"
                className="content-comment"
              />
            </div>

            {/* 유저 ID + 비밀번호 */}
            <div className="user-info">
              <div className="content-box">
                <span className="content-title">유저 ID</span>
                <input
                  type={showId ? 'text' : 'password'}
                  name="userId"
                  value={infoData.userId}
                  onChange={handleInfoChange}
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
                  onChange={handleInfoChange}
                  placeholder="비밀번호를 입력해주세요"
                  className="content-comment"
                />
              </div>
              <img
                src={Eyes}
                alt="비밀번호 보기"
                className="password-eyes"
                onClick={togglePassword}
              />
            </div>
          </form>
          <button type="submit">제출</button>
        </div>
      </div>
    </div>
  )
}

export default Myshop
