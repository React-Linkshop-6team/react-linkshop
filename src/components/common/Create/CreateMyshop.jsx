import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'
import CreateShopInfo from '../Create/CreateShopInfo'
import Spinner from '../Spinner'

const CreateMyshop = ({ infoData, setInfoData }) => {
  const [fileName, setFileName] = useState('대표 이미지를 첨부해주세요')
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = async file => {
    const formData = new FormData()
    formData.append('image', file)

    console.log('업로드할 URL:', import.meta.env.VITE_IMAGE_UPLOAD_URL)

    try {
      const res = await fetch(import.meta.env.VITE_IMAGE_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('이미지 업로드 실패')

      const data = await res.json()
      console.log('✅ 업로드 성공:', data)
      return data.url
    } catch (err) {
      console.error('❌ 업로드 중 에러:', err)
      return null
    }
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    const safeFileName = `${uuidv4()}.${file.name.split('.').pop()}`
    const renamedFile = new File([file], safeFileName, { type: file.type })

    setIsLoading(true)

    const uploadedUrl = await uploadImage(renamedFile)

    setIsLoading(false)

    if (!uploadedUrl) {
      alert('이미지 업로드 실패')
      return
    }

    setFileName(safeFileName)
    setImageUrl(uploadedUrl)
  }

  return (
    <>
      <span className="my-item">내 쇼핑몰</span>
      <div className="my-item-shop">
        <div className="item-content">
          {isLoading ? <Spinner text="사진 업로드 중입니다..." /> : null}
          <CreateRepItemImageUploader
            title="쇼핑몰 프로필"
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

export default CreateMyshop
