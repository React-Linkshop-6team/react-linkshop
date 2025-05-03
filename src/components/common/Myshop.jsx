import React, { useState, useEffect, useRef } from 'react'

import Eyes from '../../assets/images/eyes.webp'
import LinkShopById from '../../api/api.js'
import uploadImage from '../../api/api.js'

const MyShop = ({ teamId, linkShopId }) => {
  const [infoData, setInfoData] = useState({
    name: '',
    shopUrl: '',
    userId: '',
    password: '',
    imageUrl: '',
  })
  const [inputUserId, setInputUserId] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imgFile, setImgFile] = useState({ imgFile: null })
  const [showId, setShowId] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!linkShopId) {
      setLoading(false)
      return
    }

    const getLinkShopDetail = async () => {
      try {
        const data = await LinkShopById(teamId, linkShopId)
        setInfoData({
          name: data.name || '',
          shopUrl: data.shop?.shopUrl || '',
          userId: data.userId || '',
          password: data.password || '',
          imageUrl: data.imageUrl || '',
        })
      } catch (error) {
        alert('링크샵 정보 불러오기 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    getLinkShopDetail()
  }, [teamId, linkShopId])

  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage(file)
      setInfoData(prev => ({ ...prev, imageUrl }))
      setImgFile({ imgFile: file })
    } catch (error) {
      alert('이미지 업로드 실패:', error)
    }
  }

  const handleInfoChange = e => {
    const { name, value } = e.target
    setInfoData(prev => ({ ...prev, [name]: value }))

    if (name === 'userId') setInputUserId(value)
    if (name === 'password') setInputPassword(value)
  }

  const handleUpdateClick = async () => {
    setError('')

    if (inputUserId === infoData.userId && inputPassword === infoData.password) {
      try {
        const putEdit = {
          currentPassword: inputPassword,
          shop: {
            imageUrl: infoData.imageUrl,
            urlName: infoData.name,
            shopUrl: infoData.shopUrl,
          },
          userId: infoData.userId,
          name: infoData.name,
        }

        await updateLinkShop(teamId, linkShopId, putEdit)
        alert('링크샵 정보가 수정되었습니다!')
      } catch (updateError) {
        alert('링크샵 정보 수정 실패:', updateError)
        setError('링크샵 정보 수정에 실패했습니다.')
      }
    } else {
      setError('사용자 ID 또는 비밀번호가 일치하지 않습니다.')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(infoData)
  }

  const toggleId = () => setShowId(prev => !prev)
  const togglePassword = () => setShowPassword(prev => !prev)

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="my-item-shop">
      <div className="shop">
        <span className="my-item">내 쇼핑몰</span>
        <div className="item-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="content-file">
              <div className="content-box">
                <span className="content-title">상품 대표 이미지</span>
                <span className="content-comment">
                  {imgFile.imgFile?.name ||
                    infoData.imageUrl?.split('/').pop() ||
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

          <button type="button" onClick={handleUpdateClick}>
            제출
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default MyShop
