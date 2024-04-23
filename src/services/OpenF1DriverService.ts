import { type OpenF1Driver, findBy, findOne } from '../data/OpenF1DriverRepository'

export class OpenF1DriverService {
  async findBy(filters: OpenF1Driver) {
    return await findBy(filters)
  }

  async findOne(filters: OpenF1Driver) {
    return await findOne(filters)
  }
}
