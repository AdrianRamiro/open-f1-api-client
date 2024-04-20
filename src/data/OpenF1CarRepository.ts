import { getFromApi } from './OpenF1ApiBase'

export interface OpenF1Car {
  brake?: number
  date?: string
  driver_number: number
  drs?: number
  meeting_key?: number
  n_gear?: number
  rpm?: number
  session_key: number
  speed?: number
  throttle?: number
}

export const findBy = async (filters: OpenF1Car) => {
  const data = await getFromApi('car_data', filters)

  return data as OpenF1Car[]
}
