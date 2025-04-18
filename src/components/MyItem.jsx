import ImgUpload from './ImgUpload/ImgUpload'
import InfoInput from './InfoInput/InfoInput'
import React, { useState } from 'react'

const MyItem = () => {
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
        <ImgUpload values={values} onChange={handleChange} />
        <InfoInput />
      </div>
    </div>
  )
}

export default MyItem
