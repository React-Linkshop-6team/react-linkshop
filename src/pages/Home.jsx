import { useEffect, useState } from 'react'

import ShopList from '../components/ShopList/ShopList'
import { getShops } from '../api/api'

const Home = () => {
  const [shopList, setShopList] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getShops()
      setShopList(data)
    }

    getData()
  }, [])

  return (
    <div>
      <ShopList list={shopList} />
    </div>
  )
}

export default Home
