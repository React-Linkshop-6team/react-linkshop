import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { ref, get, child } from 'firebase/database'

import { getShops } from '../api/api'
import { db } from '../firebase' // 내부 import는 나중에!
import redBlueImg from '../assets/images/detail-img.png'
import goToBack from '../assets/images/go-to-back.png'
import DetailPageItemList from '../components/DetailPageItemList'
import AboutShop from '../components/AboutShop.jsx'
import ModalStateControl from '../components/ModalStateControl'

const MyStore = () => {
  const [myShop, setMyShop] = useState(null)

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (!user) return

      const uid = user.uid

      // Realtime Database에서 userId 가져오기
      const userRef = ref(db)
      const snapshot = await get(child(userRef, `users/${uid}`))

      if (!snapshot.exists()) {
        return
      }

      const userId = snapshot.val().userId

      // 샵 목록에서 userId 비교
      const allShops = await getShops()
      const foundShop = allShops.find(shop => String(shop.userId) === String(userId))

      setMyShop(foundShop)
    })

    return () => unsubscribe()
  }, [])

  if (!myShop) return <p>내 스토어를 찾을 수 없습니다.</p>

  return (
    <header>
      <img className="top-image" src={redBlueImg} alt="Top Image" />
      <button className="back-button">
        <Link to="/" className="go-to-back">
          <img src={goToBack} alt="go-to-back-icon" />
          <span>돌아가기</span>
        </Link>
      </button>
      <section className="famous-items">
        <AboutShop id={myShop.id} />
        <h2 className="famous-item-title">대표 상품</h2>
        <DetailPageItemList id={myShop.id} />
      </section>
      <ModalStateControl shopId={myShop.id} />
    </header>
  )
}

export default MyStore
