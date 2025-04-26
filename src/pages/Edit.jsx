import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import EditMyShop from '../components/common/Edit/EditMyshop'
import EditRepItem from '../components/common/Edit/EditRepItem'
const LINKSHOP_API_URL = import.meta.env.VITE_LINKSHOP_API_URL
import { LinkShopById } from '../api/api'

const Edit = () => {
  const { linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
  const teamId = '15-6'
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        console.error('데이터 불러오기 실패', err)
      }
    }

    fetchData()
  }, [linkShopId])

  const handleUpdate = async () => {
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
    console.log('🔧 PUT 요청 보낼 내용:', putEdit)
    try {
      const response = await axios.put(`${LINKSHOP_API_URL}/${linkShopId}`, putEdit, {})
      navigate(`/profile/${linkShopId}`)
      // 필요하다면 성공 후 처리 로직
    } catch (error) {
      console.error('❌ 수정 실패:', error.response?.data || error)
    }
  }

  // Edit.tsx
  return (
    <div className="edit-page">
      {shopInfo && (
        <>
          <EditRepItem data={productList} onChange={setProductList} />
          <EditMyShop data={shopInfo} onChange={setShopInfo} />
          <button className="edit-button" onClick={handleUpdate}>
            수정 완료
          </button>
        </>
      )}
    </div>
  )
}
export default Edit
