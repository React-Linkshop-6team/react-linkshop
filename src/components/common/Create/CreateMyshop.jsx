import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'
import CreateShopInfo from '../Create/CreateShopInfo'

const CreateMyshop = ({ infoData, setInfoData }) => {
  const [fileName, setFileName] = useState('대표 이미지를 첨부해주세요')
  const [imageUrl, setImageUrl] = useState(null)

  const uploadImage = async file => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('https://linkshop-api.vercel.app/images/upload', {
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
