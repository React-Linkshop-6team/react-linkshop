import { useCallback } from 'react'

export const useWebpConverter = () => {
  const convertToWebP = useCallback(file => {
    //Promise를 리턴
    return new Promise((resolve, reject) => {
      //성공or실패 시 전달 함수
      const img = new Image()
      const reader = new FileReader() //선택된 파일을 읽어오는 도구

      reader.onload = e => (img.src = e.target.result) //이미지가 브라우저메모리에 로드
      reader.onerror = reject //에러나면 reject 로 에러처리
      reader.readAsDataURL(file) //파일을 Base64 문자열로 변환

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width //이미지 크기만큼 캔버스 생성
        canvas.height = img.height
        const ctx = canvas.getContext('2d') // 이미지 그려넣음 (2차원)
        ctx.drawImage(img, 0, 0) //그릴 이미지, 그림 그려넣기시작할 좌
        canvas.toBlob(
          // // blob은 캔버스를 웹피 형식으로 변환
          blob => {
            if (blob) {
              //변환 성공 시
              const webpFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                // 서버 업로드를 위해 blob을 실제 File객체로 변환 / 확장자webp로 변환
                type: 'image/webp', //'image/webp': 뽑을 파일의 형식
              })
              resolve(webpFile)
            } else {
              reject(new Error('WebP 변환 실패'))
            }
          },
          'image/webp',
          0.8 //압축률 / 1에 가까울수록 고화질
        )
      }
    })
  }, [])

  return convertToWebP
}

export default useWebpConverter
