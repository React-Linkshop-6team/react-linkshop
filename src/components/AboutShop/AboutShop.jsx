import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { getShopById } from '../../api/api.js'
import ShopLike from '../common/ShopLike.jsx'
import ModalStateControl from '../ModalStateControl/ModalStateControl.jsx'
import urlCopyIcon from '../../assets/images/url-copy-icon.webp'
import filterIcon from '../../assets/images/filter-icon.webp'
import Spinner from '../common/Spinner.jsx'

const AboutShop = ({ id: propId }) => {
  const { id: routeId } = useParams()
  const id = propId ?? routeId
  const location = useLocation()
  const [shop, setShop] = useState(null)
  const [openModal, setOpenModal] = useState(false)

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

  const loginUser = JSON.parse(sessionStorage.getItem('linkshopUser'))
  const isMyStore = loginUser?.userId === userId

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

          <ModalStateControl
            shopId={id}
            isVisible={openModal}
            setIsVisible={setOpenModal}
            isMyStore={isMyStore}
          />
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
