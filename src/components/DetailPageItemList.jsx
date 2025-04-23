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
    <div className="render-item-list">
      {itemList.length > 0 ? (
        itemList.map(item => (
          <div className="item-name" key={item.name}>
            <img className="item-image" src={item.imageUrl} alt={item.name || '상품 이미지'} />
            <p className="item-price">₩{item.price.toLocaleString()}원</p>
          </div>
        ))
      ) : (
        <p>상품 정보가 없습니다.</p>
      )}
    </div>
  )
}

export default DetailPageItemList

{
  /* <div className="create-wrap">
      <CreateMyshop
        infoData={infoData}
        setInfoData={setInfoData}
        items={items}
        setItems={setItems}
      />
      <CreateRepItem
        items={items}
        setItems={setItems}
        onImageUpload={handleImageUpload} // 이미지 업로드 핸들러를 props로 전달
      />

      <button
        onClick={handleSubmit}
        className={`submit-btn ${isFormValid() ? 'enabled' : ''}`}
        disabled={!isFormValid()}
      >
        생성하기
      </button>
    </div> */
}
