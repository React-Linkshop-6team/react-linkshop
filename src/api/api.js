import axios from 'axios'

const API_LINK = 'https://linkshop-api.vercel.app/15-6/linkshops'

export const fetchShopList = async () => {
  try {
    const response = await axios.get(API_LINK)
    return response.data.list
  } catch (error) {
    console.error('에러 출력', error)
    return []
  }
}

export default fetchShopList
