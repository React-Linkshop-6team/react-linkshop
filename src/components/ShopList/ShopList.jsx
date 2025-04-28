import { useState, useEffect } from 'react'

import SearchBar from '../SearchBar/SearchBar'
import ShopCard from '../ShopCard/ShopCard'
import NoResult from '../NoResult/NoResult'
import FilterModal from '../FilterModal/FilterModal'
import polygonFilter from '../../assets/images/polygon-filter.png'
import useScrollHandler from '../../hooks/useScrollHandler'
import Spinner from '../common/Spinner'
import { getShopsByCursor, getShopsByFilter } from '../../api/api'

const ShopList = () => {
  const [shops, setShops] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const [loading, setLoading] = useState(true)

  const [searchItem, setSearchItem] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('상세필터')

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

      {!hasMore && <div className="shop-list-end" />}
    </div>
  )
}

export default ShopList
