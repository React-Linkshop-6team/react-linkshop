import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import EditDeleteModal from '../components/EditDeleteModal'

import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import emptyHeart from '../assets/images/empty-heart.png'
import urlCopyIcon from '../assets/images/url-copy-icon.png'
import filterIcon from '../assets/images/filter-icon.png'

const ProfileDetail = () => {
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
  const location = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const [renderModal, setRenderModal] = useState(0)
  const modalRef = useRef()

  const handleToggleModal = useCallback(() => {
    setOpenModal(prev => {
      const newState = !prev
      if (newState) setRenderModal(prev => prev + 1)
      return newState
    })
  }, [])

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
        <div>
          <img className="heart-icon" src={emptyHeart} />1
        </div>
        <div className="copy-filter-icon">
          <button className="url-copy-button">
            <img src={urlCopyIcon} onClick={() => handleCopy(`${URL}${location.pathname}`)} />
          </button>
          <button className="edit-delete-button" onClick={handleToggleModal}>
            <img src={filterIcon} />
          </button>
          {openModal && (
            <section>
              <EditDeleteModal />
            </section>
          )}
        </div>
      </div>
      <section className="famous-items">대표 상품</section>
      <div>상품 리스트</div>
    </header>
  )
}

export default ProfileDetail
