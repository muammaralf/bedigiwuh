import { Stats } from "../../common/rest.entity"
import { Article } from "../../entity/article.entity"
import { Filter } from "../../entity/filter.entity"

export interface IArticleUseCase {
  create(data: Article): Promise<void>
  update(id: number, data: Article): Promise<void>
  delete(id: number): Promise<void>
  getAll(filter?: Filter): Promise<{ data: Article[], stats: Stats }>
  getById(id: number): Promise<Article>
}