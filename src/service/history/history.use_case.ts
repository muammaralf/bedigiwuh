import { Stats } from "../../common/rest.entity"
import { Filter } from "../../entity/filter.entity"
import { History } from "../../entity/history.entity"

export interface IHistoryUseCase {
  addHistory(data: History): Promise<void>
  getHistories(filter?: Filter): Promise<{ data: History[], stats: Stats }>
}