const COLORS = ['#fb545b', '#3e45ec']

// ShopProfile 컴포넌트
// 역할: 상점의 프로필 정보를 표시하는 컴포넌트
// 상점 이름, 상점 정보, 대표 상품 개수를 받아서 화면에 보여준다.
const ShopProfile = ({ name, shopInfo, productsCount }) => {
  const { imageUrl, urlName } = shopInfo
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

  return (
    <div className="shop-profile">
      <div className="profile-info">
        <div className="profile-image-container" style={{ backgroundColor: randomColor }}>
          <img className="profile-image" src={imageUrl} alt={name} />
        </div>
        <div className="profile-texts-container">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-url">@{urlName}</p>
        </div>
      </div>
      <p className="profile-count">대표 상품 {productsCount}</p>
    </div>
  )
}

export default ShopProfile
