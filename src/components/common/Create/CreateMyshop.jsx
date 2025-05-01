import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useWebpConverter } from '../../../hooks/useWebpConverter'
import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'
import CreateShopInfo from '../Create/CreateShopInfo'
import Spinner from '../Spinner'

const CreateMyshop = ({ infoData, setInfoData, shopImageUrl, setShopImageUrl }) => {
  const [fileName, setFileName] = useState('대표 이미지를 첨부해주세요')
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const convertToWebP = useWebpConverter()

  const uploadImage = async file => {
    const webpFile = await convertToWebP(file)
    const formData = new FormData()
    formData.append('image', webpFile)

    console.log('업로드할 URL:', import.meta.env.VITE_IMAGE_UPLOAD_URL)
    console.log('이미지확인', webpFile)

    try {
      const res = await fetch(import.meta.env.VITE_IMAGE_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('이미지 업로드 실패')

      const data = await res.json()
      return data.url
    } catch (err) {
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

    setShopImageUrl(uploadedUrl)
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
