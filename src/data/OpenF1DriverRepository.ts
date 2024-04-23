import { getFromApi } from './OpenF1ApiBase'

export interface OpenF1Driver {
  broadcast_name?: string
  country_code?: string
  driver_number?: number
  first_name?: string
  full_name?: string
  headshot_url?: string
  last_name?: string
  meeting_key?: number
  name_acronym?: string
  session_key?: number
  team_colour?: string
  team_name?: string
}

export const findBy = async (filters: OpenF1Driver) => {
  const data = await getFromApi('drivers', filters)

  return data as OpenF1Driver[]
}

export const findOne = async (filters: OpenF1Driver) => {
  const data = await findBy(filters)

  return data[0] as OpenF1Driver
}
