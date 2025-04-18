import axios from 'axios'

const LINKSHOP_API_URL = 'https://linkshop-api.vercel.app/15-6/linkshops'

export const getShops = async () => {
  try {
    const response = await axios.get(LINKSHOP_API_URL)
    return response.data.list
  } catch (error) {
    console.error('에러가 발생했습니다.', error)
    return []
  }
}
