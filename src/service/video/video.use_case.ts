import { Stats } from "../../common/rest.entity"
import { Video } from "../../entity/video.entity"
import { Filter } from "../../entity/filter.entity"

export interface IVideoUseCase {
  create(data: Video): Promise<void>
  update(id: number, data: Video): Promise<void>
  delete(id: number): Promise<void>
  getAll(filter?: Filter): Promise<{ data: Video[], stats: Stats }>
  getById(id: number): Promise<Video>
}