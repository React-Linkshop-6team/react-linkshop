import React, { useState, useRef, useEffect } from 'react'
import Eyes from '../../../assets/images/eyes.png'
import uploadImage from '../../../api/api.js'

const EditMyShop = ({ data, onChange, validateTrigger, onValidateResult }) => {
  const [inputUserId, setInputUserId] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [showId, setShowId] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (validateTrigger) {
      validateUserInfo()
    }
  }, [validateTrigger])

  const validateUserInfo = () => {
    const isValid = inputUserId === data.userId && inputPassword === data.password

    if (!isValid) {
      setError('ID 또는 비밀번호가 일치하지 않습니다.')
      onValidateResult(false)
    } else {
      setError('')
      onValidateResult(true)
    }
  }

  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)
      onChange(prev => ({ ...prev, imageUrl }))
      setImgFile(file)
    } catch (error) {
      console.error('이미지 업로드 실패:', error)
    }
  }

  const handleInfoChange = e => {
    const { name, value } = e.target
    onChange(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="my-item-shop">
      <div className="shop">
        <span className="my-item">내 쇼핑몰</span>
        <div className="item-content">
          <form onSubmit={e => e.preventDefault()} className="form">
            <div className="content-file">
              <div className="content-box">
                <span className="content-title">상품 대표 이미지</span>
                <span className="content-comment">
                  {imgFile?.name || data.imageUrl?.split('/').pop() || '상품 이미지를 첨부해주세요'}
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

            <div className="content-box">
              <span className="content-title">이름</span>
              <input
                type="text"
                name="name"
                value={data.name || ''}
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
                value={data.shopUrl || ''}
                onChange={handleInfoChange}
                placeholder="Url을 입력해주세요"
                className="content-comment"
              />
            </div>

            <div className="user-info">
              <div className="content-box">
                <span className="content-title">유저 ID 확인</span>
                <input
                  type={showId ? 'text' : 'password'}
                  value={inputUserId}
                  onChange={e => setInputUserId(e.target.value)}
                  placeholder="유저 ID를 입력해주세요"
                  className="content-comment"
                />
              </div>
              <img
                src={Eyes}
                alt="아이디 보기"
                className="password-eyes"
                onClick={() => setShowId(prev => !prev)}
              />
            </div>

            <div className="user-info">
              <div className="content-box">
                <span className="content-title">비밀번호 확인</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPassword || ''}
                  onChange={e => setInputPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                  className="content-comment"
                />
              </div>
              <img
                src={Eyes}
                alt="비밀번호 보기"
                className="password-eyes"
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default EditMyShop
