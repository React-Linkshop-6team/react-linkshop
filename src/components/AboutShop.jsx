import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { getShopById } from '../api/api'
import ShopLike from './common/ShopLike'
import ModalStateControl from './ModalStateControl'
import urlCopyIcon from '../assets/images/url-copy-icon.png'
import filterIcon from '../assets/images/filter-icon.png'
import Spinner from '../components/common/Spinner.jsx'

const AboutShop = ({ id: propId }) => {
  const { id: routeId } = useParams()
  const id = propId ?? routeId
  const location = useLocation()
  const [shop, setShop] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const isMyStore = location.pathname === '/mystore'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${location.pathname}`)
      alert('주소가 복사되었습니다!')
    } catch (error) {
      alert(error)
    }
  }

  const handleToggleModal = () => {
    setOpenModal(prev => !prev)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShopById(id)
      if (data) {
        setShop(data)
      }
    }

    fetchData()
  }, [id])

  if (!shop) return <Spinner />

  const { shop: shopInfo, likes, userId, name } = shop
  const { urlName, shopUrl, imageUrl } = shopInfo

  return (
    <div className="shop-information">
      <div className="like-copyicon-morebutton">
        <ShopLike likes={likes} shopKey={id} />
        <div className="buttons">
          <button className="url-copy-button" onClick={handleCopy}>
            <img className="copy-icon" src={urlCopyIcon} alt="URL 복사" />
          </button>
          {isMyStore && (
            <button className="edit-delete-button" onClick={handleToggleModal}>
              <img className="filter-icon" src={filterIcon} alt="수정·삭제" />
            </button>
          )}
          <ModalStateControl shopId={id} isVisible={openModal} setIsVisible={setOpenModal} />
        </div>
      </div>
      <div className="shop-image-container">
        <img className="shop-image" src={imageUrl} alt={urlName} />
      </div>
      <div className="shop-name">{name}</div>
      <a className="shop-url" href={shopUrl} target="_blank" rel="noopener noreferrer">
        @ {userId}
      </a>
    </div>
  )
}

export default AboutShop
