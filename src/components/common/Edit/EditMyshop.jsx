import { useState, useRef } from 'react'

import Eyes from '../../../assets/images/eyes.png'
import { uploadImage } from '../../../api/api'

const EditMyShop = ({ data, onChange }) => {
  const [imgFile, setImgFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  if (!data) return null

  const handleImgChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    const uploadedUrl = await uploadImage(file)
    if (!uploadedUrl) {
      alert('이미지 업로드에 실패했습니다.')
      return
    }

    setFileName(file.name)
    setImageUrl(uploadedUrl)
  }

  return (
    <>
      <span className="my-item">내 쇼핑몰</span>
      <div className="my-item-shop">
        <div className="item-content">
          <CreateRepItemImageUploader
            fileName={fileName}
            onImageUpload={handleImageUpload}
            id="myshop"
          />
          <CreateShopInfo infoData={infoData} setInfoData={setInfoData} />
        </div>
      </div>
    </>
  )
}

export default Myshop
