import { useState } from 'react'

import emptyHeart from '../../assets/images/empty-heart.png'
import heart from '../../assets/images/heart.png'
import { addLike, removeLike } from '../../api/api'

const ShopLike = ({ likes = 0, shopKey }) => {
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`liked_${shopKey}`) === 'true'
  })

  const [likeCount, setLikeCount] = useState(likes)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLikeClick = async () => {
    if (isProcessing) return
    setIsProcessing(true)

    if (!liked) {
      setLiked(true)
      setLikeCount(prev => prev + 1)
      localStorage.setItem(`liked_${shopKey}`, 'true')

      const success = await addLike(shopKey)
      if (!success) {
        setLiked(false)
        setLikeCount(prev => Math.max(prev - 1, 0))
        localStorage.setItem(`liked_${shopKey}`, 'false')
      }
    } else {
      setLiked(false)
      setLikeCount(prev => Math.max(prev - 1, 0))
      localStorage.setItem(`liked_${shopKey}`, 'false')

      const success = await removeLike(shopKey)
      if (!success) {
        setLiked(true)
        setLikeCount(prev => prev + 1)
        localStorage.setItem(`liked_${shopKey}`, 'true')
      }
    }

    setIsProcessing(false)
  }

  return (
    <div className="shop-like">
      <img src={liked ? heart : emptyHeart} alt="좋아요 아이콘" onClick={handleLikeClick} />
      {likeCount}
    </div>
  )
}

export default ShopLike
