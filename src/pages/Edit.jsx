/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import EditMyShop from '../components/common/Edit/EditMyshop'
import EditRepItem from '../components/common/Edit/EditRepItem'

import { updateLinkShop, LinkShopById } from '../api/api'

const Edit = () => {
  const { linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
  const teamId = '15-6'
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
        console.log(putEdit)
      }
    }

    fetchData()
  }, [linkShopId])

  const handleUpdate = async () => {
    const putEdit = {
      currentPassword: shopInfo.password,
      shop: {
        imageUrl: shopInfo.imageUrl,
        urlName: 'kimpizza',
        shopUrl: shopInfo.shopUrl,
      },
      products: productList.map(item => ({
        price: Number(item.productPrice),
        imageUrl: item.imageUrl,
        name: item.name || '',
      })),
      userId: shopInfo.userId,
      name: shopInfo.name,
    }

    try {
      await updateLinkShop(linkShopId, putEdit)
      alert('수정 완료!')
    } catch (err) {
      console.error('업데이트 실패', err)
      console.log('🧾 요청 데이터:', putEdit)
      console.log('response:', err.response?.data)
    }
  }

  return (
    <>
      {shopInfo && (
        <>
          <EditRepItem data={productList} onChange={setProductList} />
          <EditMyShop data={shopInfo} onChange={setShopInfo} />
          <button onClick={handleUpdate}>수정 완료</button>
        </>
      )}
    </>
  )
}
export default Edit
