import { useNavigate } from 'react-router-dom'

const ShopProfile = ({ name, shopInfo, productsCount, listId }) => {
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
