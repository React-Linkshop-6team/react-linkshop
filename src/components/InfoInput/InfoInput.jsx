const InfoInput = () => {
  return (
    <div>
      <div className="content-box">
        <span className="content-title">이름</span>
        <input placeholder="표시하고 싶은 이름을 적어 주세요" className="content-comment" />
      </div>
      <div className="content-box">
        <span className="content-title">Url</span>
        <input placeholder="Url을 입력해주세요" className="content-comment" />
      </div>
      <div className="content-box">
        <span className="content-title">유저 ID</span>
        <input placeholder="유저 ID를 입력해주세요" className="content-comment" />
      </div>
      <div className="content-box">
        <span className="content-title">비밀번호</span>
        <input placeholder="비밀번호를 입력해주세요" className="content-comment" />
      </div>
    </div>
  )
}

export default InfoInput
