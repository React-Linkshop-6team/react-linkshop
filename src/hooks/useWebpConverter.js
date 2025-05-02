/* eslint-disable */
import { useCallback } from 'react'

export const useWebpConverter = () => {
  const convertToWebP = useCallback(file => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = e => (img.src = e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          blob => {
            if (blob) {
              const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                type: 'image/webp',
              })
              resolve(webpFile)
            } else {
              reject(new Error('WebP 변환 실패'))
            }
          },
          'image/webp',
          0.8
        )
      }
    })
  }, [])

  return convertToWebP
}

export default useWebpConverter
