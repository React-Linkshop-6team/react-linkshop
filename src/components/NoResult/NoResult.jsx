import emptyImg from '../../assets/images/no-search.png'

// NoResult 컴포넌트
// 역할: 검색어 입력 후, 검색 결과에 맞는 샵(상점)이 없을 경우 보여주는 컴포넌트
const NoResult = () => {
  return (
    <div className="no-result">
      <img src={emptyImg} alt="검색 결과 없음" />
      <p>검색 결과가 없어요</p>
      <p>지금 프로필을 만들고 내 상품을 소개해보세요</p>
    </div>
  )
}

export default NoResult
