import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'

import { getShops } from '../api/api'
import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import DetailPageItemList from '../components/DetailPageItemList'
import AboutShop from '../components/AboutShop.jsx'

const MyStore = () => {
  const [myShop, setMyShop] = useState(null)

  useEffect(() => {
    const fetchMyShop = async () => {
      const auth = getAuth()
      const currentUser = auth.currentUser

      if (!currentUser) return

      const allShops = await getShops()
      const userId = currentUser.reloadUserInfo?.userId
      if (!userId) return
      const foundShop = allShops.find(shop => shop.userId === userId)

      setMyShop(foundShop)
    }

    fetchMyShop()
  }, [])

  if (!myShop) return <p>내 스토어를 찾을 수 없습니다.</p>

  return (
    <header>
      <img className="top-image" src={redBlueImg} alt="Top Image" />
      <button className="back-button">
        <Link to="/" className="go-to-back">
          <img src={goToBack} alt="go-to-back-icon" />
          <span>돌아가기</span>
        </Link>
      </button>
      <section className="famous-items">
        <AboutShop shop={myShop} />
        <h2 className="famous-item-title">대표 상품</h2>
        <DetailPageItemList products={myShop.products} />
      </section>
    </header>
  )
}

export default MyStore
