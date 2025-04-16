import ShopCard from '../ShopCard/ShopCard'

// ShopList 컴포넌트
// 역할: 상점 데이터 배열(list)을 받아 각 상점을 ShopCard 컴포넌트로 렌더링
// 리스트를 순회하여 각각의 상점을 화면에 보여주는 컴포넌트 역할을 한다.
const ShopList = ({ list }) => {
  return (
    <div className="shop-list">
      {list.map(shop => (
        <ShopCard shop={shop} key={shop.id} />
      ))}
    </div>
  )
}

export default ShopList
