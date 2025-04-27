import searchIcon from '../../assets/images/search-icon.png'

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
