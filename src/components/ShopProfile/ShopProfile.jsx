import { COLORS } from '../../constants/color'
import { useNavigate } from 'react-router-dom'

// ShopProfile 컴포넌트
// 역할: 상점의 프로필 정보를 표시하는 컴포넌트
// 상점 이름, 상점 정보, 대표 상품 개수를 받아서 화면에 보여준다.
const ShopProfile = ({ name, shopInfo, productsCount, listId }) => {
  const { imageUrl, urlName, id } = shopInfo

  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

  const nav = useNavigate()

  const handleClick = () => {
    nav(`/profile/${listId}`)
  }

  return (
    <div className="shop-profile">
      <div className="profile-info" onClick={handleClick}>
        <div className="profile-image-container" style={{ backgroundColor: randomColor }}>
          <img className="profile-image" src={imageUrl} alt={name} />
        </div>
        <div className="profile-texts-container">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-url">@{urlName}</p>
        </div>
      </div>
      <p className="profile-count">대표 상품 {productsCount} 개</p>
    </div>
  )
}

export default ShopProfile
