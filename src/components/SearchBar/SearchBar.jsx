import searchIcon from '../../assets/images/search-icon.png'

// SearchBar 컴포넌트
// 역할: 검색어 입력 및 검색어 검색 결과를 표시하는 컴포넌트로, 입력 값이 바뀔 때마다 onSearch 함수를 호출하여 상위 컴포넌트로 보낸다.
const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="search-icon" className="search-icon" />
      <input
        type="text"
        placeholder="샵 이름으로 검색해 보세요."
        onChange={e => onSearch(e.target.value)}
        className="search-bar-input"
      />
    </div>
  )
}

export default SearchBar
