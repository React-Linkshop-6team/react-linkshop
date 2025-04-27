import { useNavigate } from 'react-router-dom'

// ShopProfile 컴포넌트
// 역할: 상점의 프로필 정보를 표시하는 컴포넌트
// 상점 이름, 상점 정보, 대표 상품 개수를 받아서 화면에 보여준다.
const ShopProfile = ({ name, userId, shopInfo, productsCount, listId }) => {
  const { imageUrl } = shopInfo

  const nav = useNavigate()

  const handleClick = () => {
    nav(`/profile/${listId}`)
  }

  return (
    <div className="shop-profile">
      <div className="profile-info" onClick={handleClick}>
        <div className="profile-image-container">
          <img className="profile-image" src={imageUrl} alt={name} />
        </div>
        <div className="profile-texts-container">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-url">@{name || '기본 사용자 ID'}</p>
        </div>
      </div>
      <p className="profile-count">대표 상품 {productsCount} 개</p>
    </div>
  )
}

export default ShopProfile
