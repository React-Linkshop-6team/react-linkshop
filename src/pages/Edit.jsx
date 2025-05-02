import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Spinner from '../components/common/Spinner'
import { LinkShopById, updateLinkShop } from '../api/api'
import EditMyShop from '../components/common/Edit/EditMyshop'
import EditRepItem from '../components/common/Edit/EditRepItem'

const Edit = () => {
  const { linkShopId } = useParams()
  const [shopInfo, setShopInfo] = useState(null)
  const [productList, setProductList] = useState([])
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = useState(false)

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
      setProductList(
        shopData.products.map(item => ({
          id: item.id || Date.now().toString() + Math.random().toString(36).substring(2, 9),
          imageUrl: item.imageUrl || '',
          productName: item.name || '',
          productPrice: item.price ? String(item.price) : '',
        }))
      )
    }

    fetchData()
  }, [linkShopId])

  useEffect(() => {
    const isShopInfoValid = shopInfo?.name && shopInfo?.shopUrl && shopInfo?.password
    const areProductsValid = productList.every(
      item => item.imageUrl && item.productName && item.productPrice
    )

    setIsFormValid(isShopInfoValid && areProductsValid && productList.length > 0)
  }, [shopInfo, productList])

  const handleUpdate = async () => {
    if (!isFormValid) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }
    setIsSubmitting(true)
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
      setError('비밀번호가 올바르지 않습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="edit-page">
      {isSubmitting && <Spinner text="수정 중입니다..." />}
      {shopInfo && (
        <>
          <EditMyShop data={shopInfo} onChange={setShopInfo} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          <EditRepItem data={productList} onChange={setProductList} />
          <button
            className={`edit-button ${isFormValid ? '' : 'disabled'}`}
            onClick={handleUpdate}
            disabled={!isFormValid}
          >
            {isSubmitting ? '수정 중...' : '수정 완료'}
          </button>
        </>
      )}
    </div>
  )
}

export default Edit
