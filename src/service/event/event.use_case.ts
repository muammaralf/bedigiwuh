import { Stats } from "../../common/rest.entity"
import { Event } from "../../entity/event.entity"
import { Filter } from "../../entity/filter.entity"

export interface IEventUseCase {
  create(data: Event): Promise<void>
  update(id: number, data: Event): Promise<void>
  delete(id: number): Promise<void>
  getAll(filter?: Filter): Promise<{ data: Event[], stats: Stats }>
  getById(id: number): Promise<Event>
}