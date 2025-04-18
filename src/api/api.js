import axios from 'axios'

const LINKSHOP_API_URL = import.meta.env.VITE_LINKSHOP_API_URL

export const getShops = async () => {
  try {
    const response = await axios.get(LINKSHOP_API_URL)
    return response.data.list
  } catch (error) {
    console.error('에러가 발생했습니다.', error)
    return []
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
