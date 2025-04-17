import emptyHeart from '../../assets/images/empty-heart.png'
import heart from '../../assets/images/heart.png'

import { useState } from 'react'

// ShopLike 컴포넌트
// 역할: 샵 좋아요 수와 하트 아이콘을 함께 보여주는 컴포넌트
// 추후 클릭 시 좋아요 수를 업데이트하는 기능으로 확장 예정 (0417 공통 컴포넌트로 확장)
// 사용방법: 상위 컴포넌트에서 likes만 넘겨주면 된다. (샵의 좋아요)
const ShopLike = ({ likes = 0 }) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  return (
    <div className="shop-like">
      <img
        src={liked ? heart : emptyHeart}
        alt="좋아요 아이콘"
        onClick={() => {
          setLiked(!liked)
          setLikeCount(prev => prev + (liked ? -1 : 1))
        }}
      />
      {likeCount}
    </div>
  )
}

export default ShopLike
