import { useParams } from 'react-router-dom'
import RepItem from '../components/common/RepItem'
import MyShop from '../components/common/Myshop'
import React, { useState, useEffect } from 'react'
import LinkShopById from '../api/api'

const Edit = () => {
  const { teamId, linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopData = await LinkShopById(teamId, linkShopId)
        setShopInfo({
          name: shopData.name,
          shopUrl: shopData.shop?.shopUrl,
          userId: shopData.userId,
          password: shopData.password,
          imageUrl: shopData.imageUrl,
        })
        setProductList(shopData.products)
      } catch (err) {
        console.error('데이터 불러오기 실패', err)
      }
    }

    fetchData()
  }, [teamId, linkShopId])

  const handleUpdate = async () => {
    const putEdit = {
      currentPassword: shopInfo.password,
      shop: {
        imageUrl: shopInfo.imageUrl,
        urlName: shopInfo.name,
        shopUrl: shopInfo.shopUrl,
      },
      userId: shopInfo.userId,
      name: shopInfo.name,
      products: productList,
    }

    try {
      await updateLinkShop(teamId, linkShopId, putEdit)
      alert('수정 완료!')
    } catch (err) {
      console.error('업데이트 실패', err)
    }
  }

  return (
    <>
      {shopInfo && (
        <>
          <RepItem initialItems={productList} onChange={setProductList} />
          <MyShop data={shopInfo} onChange={setShopInfo} />
          <button onClick={handleUpdate}>수정 완료</button>
        </>
      )}
    </>
  )
}
export default Edit
