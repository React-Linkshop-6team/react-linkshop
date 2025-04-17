import ShopLike from '../common/ShopLike'
import ShopProfile from '../ShopProfile/ShopProfile'
import ThumbnailList from '../ThumbnailList/ThumbnailList'

// ShopCard 컴포넌트
// 역할: 개별 상점(shop) 객체를 받아 해당 상점의 정보를 카드 형태로 보여주는 컴포넌트
// 상점 이름, @아이디, 좋아요 수, 대표 상품 개수 및 최대 3개의 상품 썸네일 이미지를 렌더링
const ShopCard = ({ shop }) => {
  const { name, likes, productsCount, shop: shopInfo, products } = shop

  return (
    <div className="shop-card">
      <div className="shop-card-header">
        <ShopProfile name={name} shopInfo={shopInfo} productsCount={productsCount} />
        <ShopLike likes={likes} />
      </div>
      <div>
        <ThumbnailList products={products} />
      </div>
    </div>
  )
}

export default ShopCard
