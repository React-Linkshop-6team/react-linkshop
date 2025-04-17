// ThumbnailList 컴포넌트
// 역할: 최대 3개의 상품 썸네일 이미지를 보여주는 컴포넌트
// 각 상품의 imageUrl 속성에 해당하는 이미지를 보여줌
const ThumbnailList = ({ products }) => {
  return (
    <div className="thumbnail-list">
      {products.slice(0, 3).map(product => (
        <img
          key={product.id}
          src={product.imageUrl}
          alt={product.name}
          className="thumbnail-list-item"
        />
      ))}
    </div>
  )
}

export default ThumbnailList
