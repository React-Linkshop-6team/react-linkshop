import emptyHeart from '../../assets/images/empty-heart.png'
import heart from '../../assets/images/heart.png'

import { useState } from 'react'
import { addLike, removeLike } from '../../api/api'

// ShopLike 컴포넌트
// 역할: 샵 좋아요 수와 하트 아이콘을 함께 보여주는 컴포넌트
// 추후 클릭 시 좋아요 수를 업데이트하는 기능으로 확장 예정 (0417 공통 컴포넌트로 확장)
// 사용방법: 상위 컴포넌트에서 likes만 넘겨주면 된다. (샵의 좋아요)
const ShopLike = ({ likes = 0, shopKey }) => {
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`liked_${shopKey}`) === 'true'
  })

  const [likeCount, setLikeCount] = useState(likes)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLikeClick = async () => {
    // 요청 처리 중에는 다시 못누르도록 막기 (낙관적 업데이트로, 연속적인 버튼 클릭시 에러 예방)
    if (isProcessing) return
    setIsProcessing(true)

    if (!liked) {
      // 낙관적 업데이트 적용 (일단 표시)
      setLiked(true)
      setLikeCount(prev => prev + 1)
      localStorage.setItem(`liked_${shopKey}`, 'true')

      const success = await addLike(shopKey)
      if (!success) {
        // 서버 실패 시 롤백
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
        // 서버 실패 시 롤백
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
