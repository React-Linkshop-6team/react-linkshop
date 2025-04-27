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
