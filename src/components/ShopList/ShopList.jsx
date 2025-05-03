import { useState, useEffect } from 'react'

import ShopCard from '../ShopCard/ShopCard'
import NoResult from '../NoResult/NoResult'
import FilterModal from '../FilterModal/FilterModal'
import polygonFilter from '../../assets/images/polygon-filter.webp'
import useScrollHandler from '../../hooks/useScrollHandler'
import Spinner from '../common/Spinner'
import { getShopsByCursor, getShopsByFilter } from '../../api/api'

const ShopList = ({ searchItem, list, loading }) => {
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('상세필터')

  const [filteredShops, setFilteredShops] = useState([])

  const fetchNextShops = async () => {
    if (!hasMore) return

    if (selectedFilter === '상세필터') {
      const { list: nextList, nextCursor } = await getShopsByCursor(cursor)
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    } else {
      const { list: nextList, nextCursor } = await getShopsByFilter(selectedFilter, cursor)
      setFilteredShops(prev => {
        const existingIds = new Set(prev.map(shop => shop.id))
        const newUniqueList = nextList.filter(shop => !existingIds.has(shop.id))
        return [...prev, ...newUniqueList]
      })
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    }
  }

  useScrollHandler(hasMore, fetchNextShops)

  useEffect(() => {
    if (list.length > 0) {
      const lastItem = list[list.length - 1]
      setCursor(lastItem.cursor || lastItem.id)
      setHasMore(true)
    }
  }, [list])

  const baseShops = filteredShops.length > 0 ? filteredShops : list
  const sortedShops = baseShops
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

    if (filter === '상세필터') {
      const { list: initialList, nextCursor } = await getShopsByCursor()
      setFilteredShops([])
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    } else {
      const { list: filteredList, nextCursor } = await getShopsByFilter(filter)
      setFilteredShops(filteredList)
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
    }
  }

  const renderedShopCards =
    !loading && renderedShops.length === 0 ? (
      <NoResult />
    ) : (
      renderedShops.map(shop => <ShopCard shop={shop} key={shop.id} />)
    )

  return (
    <div className="shop-list-container">
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
