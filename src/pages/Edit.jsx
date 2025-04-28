import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import EditMyShop from '../components/common/Edit/EditMyshop'
import EditRepItem from '../components/common/Edit/EditRepItem'
import { LinkShopById, updateLinkShop, updateLinkShop } from '../api/api'

const Edit = () => {
  const { linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
  const [error, setError] = useState('') // 🔥 추가
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const shopData = await LinkShopById(linkShopId)
      setShopInfo({
        imageUrl: shopData.shop?.imageUrl,
        name: shopData.name,
        shopUrl: shopData.shop?.shopUrl,
        userId: shopData.userId,
        password: '',
        urlName: shopData.shop?.urlName,
      })
      setProductList(shopData.products)
    }

    fetchData()
  }, [linkShopId])

  const handleUpdate = async () => {
    // 🔥 비밀번호 체크
    if (!shopInfo.password || shopInfo.password.trim() === '') {
      setError('비밀번호를 입력해주세요.')
      return
    }

    try {
      const putEdit = {
        currentPassword: shopInfo.password,
        shop: {
          imageUrl: shopInfo.imageUrl,
          urlName: shopInfo.name,
          shopUrl: shopInfo.shopUrl,
        },
        products: productList.map(item => ({
          price: Number(item.productPrice),
          imageUrl: item.imageUrl,
          name: item.productName || '',
        })),
        userId: shopInfo.userId,
        name: shopInfo.name,
      }
      await updateLinkShop(linkShopId, putEdit)
      navigate(`/profile/${linkShopId}`)
    } catch (e) {
      setError('비밀번호가 올바르지 않습니다.') // 🔥 실패 시 에러 표시
    }
  }

  return (
    <div className="edit-page">
      {shopInfo && (
        <>
          <EditRepItem data={productList} onChange={setProductList} />
          <EditMyShop data={shopInfo} onChange={setShopInfo} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}{' '}
          {/* 🔥 에러 표시 */}
          <button className="edit-button" onClick={handleUpdate}>
            수정 완료
          </button>
        </>
      )}
    </div>
  )
}

export default Edit
