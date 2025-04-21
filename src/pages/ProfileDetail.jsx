import { Link, useLocation, useParams } from 'react-router-dom'
import { useState, useRef, useCallback, useEffect } from 'react'
import { getShops } from '../api/api.js'

import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import urlCopyIcon from '../assets/images/url-copy-icon.png'
import filterIcon from '../assets/images/filter-icon.png'
import ModalStateControl from '../components/ModalStateControl'
import ShopLike from '../components/common/ShopLike'
import ShopProfile from '../components/ShopProfile/ShopProfile'
import ShopCard from '../components/ShopCard/ShopCard.jsx'

import { getShopById } from '../api/api.js'
import DetailPageItemList from '../components/DetailPageItemList'


const ProfileDetail = ({ likes, shopKey }) => {
  const location = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const [renderModal, setRenderModal] = useState(0)
  const modalRef = useRef()
  const [shop, setShop] = useState(null)
  const { id } = useParams()

  const handleCopy = async string => {
    try {
      await navigator.clipboard.writeText(string)
      setTimeout(() => {
        alert('주소가 복사되었습니다!')
      }, 0)
    } catch (err) {
      console.log(err)
    }
  }

  const handleToggleModal = useCallback(() => {
    setOpenModal(prev => {
      const newState = !prev
      if (newState) setRenderModal(prev => prev + 1)
      return newState
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShopById(id)
      if (data) {
        setShop(data)
      } else {
        console.log('해당하는 상점이 없습니다.')
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
      <div className="click-icons">
        <ShopLike likes={likes} />
        <div className="copy-filter-icon">
          <button className="url-copy-button">
            <img src={urlCopyIcon} onClick={() => handleCopy(`${URL}${location.pathname}`)} />
          </button>
          <button className="edit-delete-button" onClick={handleToggleModal}>
            <img src={filterIcon} />
          </button>
          {openModal && (
            <section>
              <ModalStateControl />
            </section>
          )}
        </div>
      </div>
      <section className="famous-items">
        {shop ? <ShopCard shop={shop} /> : <p>상점 정보 로딩 중...</p>}
        <div>
          <DetailPageItemList />
        </div>
      </section>
    </header>
  )
}

export default ProfileDetail
