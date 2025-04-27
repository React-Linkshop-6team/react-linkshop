import React from 'react'

import ShopLike from '../common/ShopLike'
import ShopProfile from '../ShopProfile/ShopProfile'
import ThumbnailList from '../ThumbnailList/ThumbnailList'

const ShopCard = ({ shop }) => {
  const { name, likes, productsCount, shop: shopInfo, products } = shop

  return (
    <div className="shop-card">
      <div className="shop-card-header">
        <ShopProfile
          name={name}
          shopInfo={shopInfo}
          productsCount={productsCount}
          listId={shop.id}
        />
        <ShopLike likes={likes} shopKey={shop.id} />
      </div>
      <div>
        <ThumbnailList products={products} />
      </div>
    </div>
  )
}

export default React.memo(ShopCard)
