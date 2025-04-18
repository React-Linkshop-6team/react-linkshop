import SearchBar from '../SearchBar/SearchBar'
import ShopCard from '../ShopCard/ShopCard'
import NoResult from '../NoResult/NoResult'

import { useState } from 'react'
import FilterModal from '../FilterModal/FilterModal'
import polygonFilter from '../../assets/images/polygon-filter.png'

// ShopList 컴포넌트
// 역할: 상점 목록을 렌더링하는 컴포넌트
const ShopList = ({ list }) => {
  const [searchItem, setSearchItem] = useState('') // 사용자가 입력한 검색어
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 모달 창이 열려있는지 여부를 저장하는 상태 변수
  const [selectedFilter, setSelectedFilter] = useState('상세필터') // 선택된 필터값 (Ex. 최신순, 좋아요순)

  const updatedList = list.map(shop => {
    const savedCount = localStorage.getItem(`likeCount_${shop.id}`)
    return {
      ...shop,
      likes: savedCount !== null ? parseInt(savedCount, 10) : shop.likes,
    }
  })

  // 1. 상점 이름에 검색어가 포함된 것 만 골라냄.
  // 2. 사용자가 선택한 필터 값에 맞춰 정렬
  const filteredList = updatedList
    .filter(shop => shop.name.toLowerCase().includes(searchItem.toLowerCase()))
    .sort((a, b) => {
      if (selectedFilter === '최신순') return new Date(b.createdAt) - new Date(a.createdAt)
      if (selectedFilter === '좋아요순') return b.likes - a.likes
      if (selectedFilter === '등록된 상품순') return b.productsCount - a.productsCount
    })

  // 필터 선택 시 호출되는 함수. 선택한 필터를 state 변수에 저장한다.
  const handleFilterSelect = filter => {
    setSelectedFilter(filter)
    setIsFilterOpen(false)
  }

  return (
    <div className="shop-list-container">
      <SearchBar onSearch={setSearchItem} />

      <button onClick={() => setIsFilterOpen(true)} className="shop-filter-toggle">
        {selectedFilter}{' '}
        <img src={polygonFilter} alt="필터 화살표 아이콘" className="shop-filter-toggle-icon" />
      </button>

      {isFilterOpen && (
        <FilterModal
          selected={selectedFilter}
          onSelect={handleFilterSelect}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <div className="shop-list">
        {filteredList.length === 0 ? (
          <NoResult />
        ) : (
          filteredList.map(shop => <ShopCard shop={shop} key={shop.id} />)
        )}
      </div>
    </div>
  )
}

export default ShopList
