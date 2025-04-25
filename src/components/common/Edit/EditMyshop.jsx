/* eslint-disable */
import { useState, useRef, useEffect } from 'react'

import Eyes from '../../../assets/images/eyes.png'
import { uploadImage } from '../../../api/api'

const EditMyShop = ({ data, onChange }) => {
  const [inputUserId, setInputUserId] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return
    setImgFile(file)
    try {
      const imageUrl = await uploadImage(file)
      if (imageUrl) {
        onChange(prev => ({ ...prev, imageUrl }))
      }
    } catch (error) {
      throw new Error('이미지 업로드에 실패했습니다.')
    }
  }

  const handleInfoChange = e => {
    const { name, value } = e.target
    onChange(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="edit-my-shop">
      <div className="my-shop">
        <h5>내 쇼핑몰</h5>
        <div className="shop">
          <div className="item-content">
            <form onSubmit={e => e.preventDefault()} className="form">
              <div className="content-file">
                <div className="content-box">
                  <span className="content-title">상품 대표 이미지</span>
                  <span className="content-comment">
                    {imgFile?.name ||
                      data.imageUrl?.split('/').pop() ||
                      '상품 이미지를 첨부해주세요'}
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
                    type="text"
                    value={data.userId || ''}
                    name="userId"
                    onChange={handleInfoChange}
                    placeholder="유저 ID를 입력해주세요"
                    className="content-comment"
                  />
                </div>
              </div>

              <div className="user-info">
                <div className="content-box">
                  <span className="content-title">비밀번호 확인</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={data.password || ''}
                    name="password"
                    onChange={handleInfoChange}
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
    </div>
  )
}

export default EditMyShop
