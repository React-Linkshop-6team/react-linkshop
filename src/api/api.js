import axios from 'axios'

const LINKSHOP_API_URL = import.meta.env.VITE_LINKSHOP_API_URL
const IMAGE_UPLOAD_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL

export const getShops = async () => {
  try {
    const response = await axios.get(`${LINKSHOP_API_URL}`)

    return response.data.list
  } catch (error) {
    console.error('에러가 발생했습니다.', error)
    return []
  }
}

export default getShops

//  id값에 대한 상점 호출
export const getShopById = async id => {
  try {
    const response = await axios.get(`${LINKSHOP_API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('에러 출력', error)
    return null
  }
}

// 좋아요 버튼 눌렀을 때 등록
export const addLike = async shopId => {
  try {
    const response = await axios.post(`${LINKSHOP_API_URL}/${shopId}/like`)
    return response.status === 200 || response.status === 201
  } catch (error) {
    console.error('좋아요 실패', error)
    return false
  }
}

// 좋아요 취소 버튼 눌렀을 때 등록
export const removeLike = async shopId => {
  try {
    const response = await axios.delete(`${LINKSHOP_API_URL}/${shopId}/like`)
    return response.status === 200
  } catch (error) {
    console.error('좋아요 취소 실패', error)
    return false
  }
}

// 생성하기 API 요청
export const createShop = async payload => {
  try {
    const response = await axios.post(LINKSHOP_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('❌ 등록 실패:', error)
    throw error.response?.data || error
  }
}

// 이미지 업로드
export const uploadImage = async file => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axios.post(IMAGE_UPLOAD_URL, formData)
    return response.data.url
  } catch (error) {
    console.error('이미지 업로드 실패', error)
    return null
  }
}
export const LinkShopById = async (teamId, linkShopId) => {
  const response = await axios.get(`${LINKSHOP_API_URL}/${linkShopId}`)
  return response.data
}

// 수정완료 버튼 눌렀을 때 등록
export const updateLinkShop = async (linkShopId, putEdit) => {
  const response = await axios.put(`${LINKSHOP_API_URL}/${linkShopId}`, putEdit, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
