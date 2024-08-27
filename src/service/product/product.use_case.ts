import { Stats } from "../../common/rest.entity"
import { Product } from "../../entity/product.entity"
import { Filter } from "../../entity/filter.entity"

export interface IProductUseCase {
  create(data: Product): Promise<void>
  update(id: number, data: Product): Promise<void>
  delete(id: number): Promise<void>
  getAll(filter?: Filter): Promise<{ data: Product[], stats: Stats }>
  getById(id: number): Promise<Product>
}