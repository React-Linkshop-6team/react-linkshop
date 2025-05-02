import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import { getShopById } from '../api/api.js'
import DetailPageItemList from '../components/DetailPageItemList/DetailPageItemList.jsx'
import AboutShop from '../components/AboutShop/AboutShop.jsx'

const ProfileDetail = () => {
  const [shop, setShop] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShopById(id)
      if (data) {
        setShop(data)
      } else {
      }
    }

    fetchData()
  }, [id])

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
        <AboutShop id={shop?.id} />
        <h2 className="famous-item-title">대표 상품</h2>
        <DetailPageItemList id={shop?.id} />
      </section>
    </header>
  )
}

export default ProfileDetail
