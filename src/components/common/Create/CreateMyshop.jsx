import React, { useState } from 'react'
import CreateRepItemImageUploader from '../Create/CreateRepItemImageUploader'
import CreateShopInfo from '../Create/CreateShopInfo'
import { v4 as uuidv4 } from 'uuid'

const CreateMyshop = ({ infoData, setInfoData, items, setItems }) => {
  const [fileName, setFileName] = useState('대표 이미지를 첨부해주세요')
  const [imageUrl, setImageUrl] = useState(null)

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

    // 안전한 파일명 생성 (uuid + 원래 확장자 유지)
    const safeFileName = `${uuidv4()}.${file.name.split('.').pop()}`

    // 새 File 객체 생성 (서버에 안전한 이름으로 전달되도록)
    const renamedFile = new File([file], safeFileName, { type: file.type })

    const uploadedUrl = await uploadImage(renamedFile)
    if (!uploadedUrl) {
      alert('이미지 업로드 실패')
      return
    }

    setFileName(safeFileName) // 안전한 파일명 상태로 저장
    setImageUrl(uploadedUrl) // 업로드된 이미지 URL 상태 저장
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

export default CreateMyshop
