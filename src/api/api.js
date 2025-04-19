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

export default getShops

//  id값에 대한 상점 호출
export const getShopById = async id => {
  try {
    const response = await axios.get(LINKSHOP_API_URL)
    const shops = response.data.list
    const shop = shops.find(item => String(item.id) === String(id))
    return shop || null
  } catch (error) {
    console.error('에러 출력', error)
    return null
  }
}
