import { useEffect } from 'react'

// 스크롤이 페이지 맨 아래에 닿았는지 감지해서 상품 카드를 더 불러오는 커스텀 훅
const useScrollHandler = (canLoadMore, onLoadMore) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= fullHeight - 100) {
        if (canLoadMore) {
          onLoadMore()
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [canLoadMore, onLoadMore])
}

export default useScrollHandler
