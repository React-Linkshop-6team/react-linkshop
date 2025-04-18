import React, { useState } from 'react'

const InfoInput = () => {
  const [shopName, setShopName] = useState('')
  const [shopUrl, setShopUrl] = useState('')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const AddData = e => {
    const { name, value } = e.target

    if (name == 'name') {
    } else if (name == 'shopUrl') {
    } else if (name == 'userId') {
    } else if (name == 'password') {
    }
  } //생성및 수정하기 페이지가 생성되면 더 디벨롭할 예정입니다(info와 img 한번에 fetch로 전달)

  const handleSubmit = () => {}

  return (
    <form onSubmit={handleSubmit}>
      <div className="content-box">
        <span className="content-title">이름</span>
        <input
          type="text"
          name="name"
          value={shopName}
          onChange={AddData}
          placeholder="표시하고 싶은 이름을 적어 주세요"
          className="content-comment"
        />
      </div>
      <div className="content-box">
        <span className="content-title">Url</span>
        <input
          type="url"
          name="shopUrl"
          value={shopUrl}
          onChange={AddData}
          placeholder="Url을 입력해주세요"
          className="content-comment"
        />
      </div>
      <div className="content-box">
        <span className="content-title">유저 ID</span>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={AddData}
          placeholder="유저 ID를 입력해주세요"
          className="content-comment"
        />
      </div>
      <div className="content-box">
        <span className="content-title">비밀번호</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={AddData}
          placeholder="비밀번호를 입력해주세요"
          className="content-comment"
        />
      </div>
    </form>
  )
}

export default InfoInput
