import axios from 'axios'

import { FILTER_QUERY_MAP } from '../constants/filterOptions'

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
    const response = await axios.post(IMAGE_UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.url
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
    return null
  }
}

export const LinkShopById = async linkShopId => {
  try {
    const response = await axios.get(`${LINKSHOP_API_URL}/${linkShopId}`)
    return response.data
  } catch (error) {
    console.error('링크샵 상세 정보 가져오기 실패:', error)
    throw error
  }
}

// 수정완료 버튼 눌렀을 때 등록
export const updateLinkShop = async (linkShopId, putEdit) => {
  try {
    const response = await axios.put(`${LINKSHOP_API_URL}/${linkShopId}`, putEdit)
    return response.data
  } catch (error) {
    console.log('실패 이유:', error.response?.data || error)
  }
}

// API 삭제하기 요청
export const deleteShop = async (id, currentPassword) => {
  try {
    console.log('삭제요청', id, currentPassword)
    const response = await axios.delete(`${LINKSHOP_API_URL}/${id}`, {
      data: { currentPassword },
    })
    return response.data
  } catch (error) {
    console.error('삭제 중 오류 발생', error.response?.data || error)
    return null
  }
}

// currentPassword 를 가져오는 put API
export const putShopById = async (id, updatedData) => {
  try {
    const response = await axios.put(`${LINKSHOP_API_URL}/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('페이지 로딩에 실패했습니다.', error.response?.data || error)
    return null
  }
}

// 커서 기반 상점 목록 조회 함수
export const getShopsByCursor = async (cursor = null) => {
  try {
    let url = `${LINKSHOP_API_URL}`
    if (cursor) {
      url += `?cursor=${cursor}`
    }

    const response = await axios.get(url)
    return {
      list: response.data.list || [],
      nextCursor: response.data.nextCursor || null,
    }
  } catch (error) {
    console.error('커서 기반 상점 조회 실패:', error)
    return { list: [], nextCursor: null }
  }
}

// api.js

export const getShopsByFilter = async (filter, cursor = null) => {
  const orderBy = FILTER_QUERY_MAP[filter]
  let url = `${LINKSHOP_API_URL}?orderBy=${orderBy}`
  if (cursor) {
    url += `&cursor=${cursor}`
  }

  try {
    const response = await axios.get(url)
    return {
      list: response.data.list || [],
      nextCursor: response.data.nextCursor || null,
    }
  } catch (error) {
    console.error('필터링된 상점 데이터를 가져오는데 실패했습니다:', error)
    return { list: [], nextCursor: null }
  }
}
