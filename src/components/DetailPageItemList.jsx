import { useState, useEffect } from 'react'

import { getShopById } from '../api/api.js'
import Spinner from './common/Spinner.jsx'

const DetailPageItemList = ({ id }) => {
  const [itemList, setItemList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchListData = async () => {
      const data = await getShopById(id)

      if (data && data.products) {
        setItemList(data.products)
      } else {
        console.warn('⚠️ 상품 정보 없음 또는 응답 형식 문제')
      }
      setIsLoading(false)
    }
    fetchListData()
  }, [id])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="render-item-list">
      {itemList.length > 0 ? (
        itemList.map(item => (
          <div className="item-name" key={item.name}>
            <img className="item-image" src={item.imageUrl} alt={item.name || '상품 이미지'} />
            <div className="item-title-price">
              <div className="item-title">{item.name}</div>
              <div className="item-price">₩ {item.price.toLocaleString()}</div>
            </div>
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
