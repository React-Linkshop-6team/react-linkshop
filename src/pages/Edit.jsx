import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import EditMyShop from '../components/common/Edit/EditMyshop'
import EditRepItem from '../components/common/Edit/EditRepItem'
import { LinkShopById } from '../api/api'

const Edit = () => {
  const { linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
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
      } catch () {
        throw new Error('데이터 불러오기 실패')
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
    try {
      const response = await updateLinkShop(linkShopId, putEdit)
      navigate(`/profile/${linkShopId}`)
    } catch (error) {
      throw new Error('수정 실패')
    }
  }

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
