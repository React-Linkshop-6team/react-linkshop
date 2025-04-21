import axios from 'axios'
import { getShopById } from '../api/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DetailPageItemList = () => {
  const { id } = useParams()
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    const fetchListData = async () => {
      const data = await getShopById(id)
      if (data && data.products) {
        setItemList(data.products)
      }
    }
    fetchListData()
  }, [id])

  return (
    <div>
      {itemList.length > 0 ? (
        itemList.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.name || '상품 이미지'} />
            <p>{item.price.toLocaleString()}원</p>
          </div>
        ))
      ) : (
        <p>상품 정보가 없습니다.</p>
      )}
    </div>
  )
}

export default DetailPageItemList
