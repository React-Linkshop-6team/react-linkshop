import { useEffect, useState } from 'react'

import ShopList from '../components/ShopList/ShopList'
import { getShopsByCursor } from '../api/api'
import SearchBar from '../components/SearchBar/SearchBar'

const Home = () => {
  const [shopList, setShopList] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [loading, setLoading] = useState(true)
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchInitialShops = async () => {
      setLoading(true)

      if (searchItem.trim() === '') {
        const { list, nextCursor } = await getShopsByCursor(null)
        setShopList(list)
        setCursor(nextCursor)
        setHasMore(!!nextCursor)
        setLoading(false)
        return
      }

      const { list, nextCursor } = await getShopsByCursor(null, searchItem)
      setShopList(list)
      setCursor(nextCursor)
      setHasMore(!!nextCursor)
      setLoading(false)
    }

    fetchInitialShops()
  }, [searchItem])

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.body.scrollHeight

      if (scrollTop + windowHeight >= fullHeight - 100 && hasMore && !loading) {
        setLoading(true)
        const { list: nextList, nextCursor } = await getShopsByCursor(cursor, searchItem)
        setShopList(prev => [...prev, ...nextList])
        setCursor(nextCursor)
        setHasMore(!!nextCursor)
        setLoading(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cursor, hasMore, loading, searchItem])

  return (
    <div>
      <SearchBar onSearch={setSearchItem} />
      <ShopList list={shopList} searchItem={searchItem} loading={loading} />
    </div>
  )
}

export default Home
