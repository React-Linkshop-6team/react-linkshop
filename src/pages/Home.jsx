import { useEffect, useState } from 'react'
import { mockData } from '../mock/mockData'
import ShopList from '../components/ShopList/ShopList'

const Home = () => {
  const [shopList, setShopList] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setShopList(mockData.list)
    }, 300)
  }, [])

  return (
    <div>
      <ShopList list={shopList} />
    </div>
  )
}

export default Home
