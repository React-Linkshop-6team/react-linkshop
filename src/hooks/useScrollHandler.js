import { useEffect } from 'react'

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
