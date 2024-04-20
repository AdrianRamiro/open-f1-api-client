import { type OpenF1Car, findBy } from '../data/OpenF1CarRepository'

export class OpenF1CarService {
  async findBy(filters: OpenF1Car) {
    return await findBy(filters)
  }
}
