import React, { useState } from 'react'

const InfoInput = () => {
  const [infoData, setInfoData] = useState({
    name: '',
    shopUrl: '',
    userId: '',
    password: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setInfoData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(infoData)
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="content-box">
        <span className="content-title">비밀번호</span>
        <input
          type="password"
          name="password"
          value={infoData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          className="content-comment"
        />
      </div>
      <button type="submit">제출</button>
    </form>
  )
}

export default InfoInput
