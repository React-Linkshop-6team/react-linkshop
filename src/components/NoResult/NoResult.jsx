import emptyImg from '../../assets/images/no-search.webP'

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
