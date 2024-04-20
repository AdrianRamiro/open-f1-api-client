import { type OpenF1Session, findBy } from '../data/OpenF1SessionRepository'

export class OpenF1SessionService {
  async findBy(filters: OpenF1Session) {
    return await findBy(filters)
  }
}
