// ShopLike 컴포넌트
// 역할: 샵 좋아요 수와 하트 아이콘을 함께 보여주는 컴포넌트
// 추후 클릭 시 좋아요 수를 업데이트하는 기능으로 확장 예정
const ShopLike = ({ likes }) => {
  return (
    <div className="shop-like">
      <span>❤️ </span>
      {likes}
    </div>
  )
}

export default ShopLike
