import { Link } from 'react-router-dom'

import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import emptyHeart from '../assets/images/empty-heart.png'
import urlCopyIcon from '../assets/images/url-copy-icon.png'
import filterIcon from '../assets/images/filter-icon.png'

const ProfileDetail = () => {
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
          <img src={urlCopyIcon} />
          <img src={filterIcon} />
        </div>
      </div>
      <section className="famous-items">대표 상품</section>
      <div>상품 리스트</div>
    </header>
  )
}

export default ProfileDetail
