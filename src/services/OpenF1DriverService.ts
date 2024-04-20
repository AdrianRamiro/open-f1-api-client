import { type OpenF1Driver, findBy } from '../data/OpenF1DriverRepository'

export class OpenF1DriverService {
  async findBy(filters: OpenF1Driver) {
    return await findBy(filters)
  }
}
