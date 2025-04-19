import ShopImg from './common/ShopImg/ShopImg'
import ShopInfo from './common/ShopInfo/ShopInfo'
import React, { useState } from 'react'

const Myshop = () => {
  const [values, setValues] = useState({
    imgFile: null,
  })

  const handleChange = (name, file) => {
    setValues(prev => ({
      ...prev,
      [name]: file,
    }))
  }

  return (
    <div className="my-item-shop">
      <span className="my-item">내 쇼핑몰</span>
      <div className="item-content">
        <ShopImg values={values} onChange={handleChange} />
        <ShopInfo />
      </div>
    </div>
  )
}

export default Myshop
