import axios from 'axios'
import { openf1 } from '@/config'

export const getFromApi = async (endpoint: string, filters: any) => {
  const response = await axios.get(`${openf1.baseURL}/${endpoint}`, {
    params: filters
  })

  return response.data
}
