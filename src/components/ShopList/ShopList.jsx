import { useState, useEffect } from 'react'

import SearchBar from '../SearchBar/SearchBar'
import ShopCard from '../ShopCard/ShopCard'
import NoResult from '../NoResult/NoResult'
import FilterModal from '../FilterModal/FilterModal'
import polygonFilter from '../../assets/images/polygon-filter.png'
import useScrollHandler from '../../hooks/useScrollHandler'
import Spinner from '../common/Spinner'
import { getShopsByCursor, getShopsByFilter } from '../../api/api'

// ShopList 컴포넌트
// 역할: 상점 목록을 렌더링하는 컴포넌트
const ShopList = () => {
  // 데이터 관련 상태
  const [shops, setShops] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  // 로딩 상태
  const [loading, setLoading] = useState(true)

  // 필터 및 검색 상태
  const [searchItem, setSearchItem] = useState('') // 사용자가 입력한 검색어
  const [isFilterOpen, setIsFilterOpen] = useState(false) // 필터 모달 창 열림 여부
  const [selectedFilter, setSelectedFilter] = useState('상세필터') // 선택된 필터값 (Ex. 최신순, 좋아요순)

  const fetchNextShops = async () => {
    if (!hasMore) return

    const fetchFunc =
      selectedFilter === '상세필터'
        ? getShopsByCursor
        : cursor => getShopsByFilter(selectedFilter, cursor)

    const { list: nextList, nextCursor } = await fetchFunc(cursor)

    if (nextList.length > 0) {
      setShops(prev => {
        const merged = [...prev, ...nextList]
        const unique = Array.from(new Map(merged.map(shop => [shop.id, shop])).values())
        return unique
      })
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    } else {
      setHasMore(false)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    const fetchInitialShops = async () => {
      setLoading(true)

      if (selectedFilter === '상세필터') {
        const { list: initialList, nextCursor } = await getShopsByCursor()
        setShops(initialList)
        setCursor(nextCursor)
        setHasMore(!!nextCursor)
      } else {
        const { list: filteredList, nextCursor } = await getShopsByFilter(selectedFilter)
        setShops(filteredList)
        setCursor(nextCursor)
        setHasMore(!!nextCursor)
      }

      setLoading(false)
    }

    fetchInitialShops()
  }, [selectedFilter])

  // 무한 스크롤 로직: 스크롤 시 다음 데이터 로드
  useScrollHandler(hasMore, fetchNextShops)

  const sortedShops = shops
    .filter(shop => shop.name.toLowerCase().includes(searchItem.toLowerCase()))
    .sort((a, b) => {
      if (selectedFilter !== '상세필터') return 0
      if (selectedFilter === '최신순') return new Date(b.createdAt) - new Date(a.createdAt)
      if (selectedFilter === '좋아요순') return b.likes - a.likes
      if (selectedFilter === '등록된 상품순') return b.productsCount - a.productsCount
      return 0
    })

  const renderedShops = sortedShops

  // 필터 선택 시 호출되는 함수. 선택한 필터를 state 변수에 저장한다.
  const handleFilterSelect = async filter => {
    setSelectedFilter(filter)
    setIsFilterOpen(false)
    setLoading(true)

    if (filter === '상세필터') {
      const { list: initialList, nextCursor } = await getShopsByCursor()
      setShops(initialList)
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    } else {
      const { list: filteredList, nextCursor } = await getShopsByFilter(filter)
      setShops(filteredList)
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    }

    setLoading(false)
  }

  // 렌더링
  const renderedShopCards =
    !loading && renderedShops.length === 0 ? (
      <NoResult />
    ) : (
      renderedShops.map(shop => <ShopCard shop={shop} key={shop.id} />)
    )

  return (
    <div className="shop-list-container">
      <SearchBar onSearch={setSearchItem} />

      <button onClick={() => setIsFilterOpen(true)} className="shop-filter-toggle">
        {selectedFilter}
        <img src={polygonFilter} alt="필터 화살표 아이콘" className="shop-filter-toggle-icon" />
      </button>

      {isFilterOpen && (
        <FilterModal
          selected={selectedFilter}
          onSelect={handleFilterSelect}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {loading && (
        <div className="shop-spinner">
          <Spinner />
        </div>
      )}

      <div className="shop-list">{renderedShopCards}</div>
    </div>
  )
}

export default ShopList
