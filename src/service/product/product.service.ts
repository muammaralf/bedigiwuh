import { SupabaseClient } from "@supabase/supabase-js";
import { Product } from "../../entity/product.entity";
import { IProductUseCase } from "./product.use_case";
import { getSupabaseClient } from "../../util/supabase/supabase";
import { Stats } from "../../common/rest.entity";
import { Filter } from "../../entity/filter.entity";
import { History, STATUS_SUCCESS } from "../../entity/history.entity";
import { IHistoryUseCase } from "../history/history.use_case";
import { HistoryService } from "../history/history.service";

export class ProductService implements IProductUseCase {
  private supabase: SupabaseClient
  private tableName: string = 'products'
  private historyService: IHistoryUseCase
  
  constructor(){
    this.supabase = getSupabaseClient()
    this.historyService = new HistoryService()  
  }


  async create(data: Product): Promise<void> {
    const { data: eventData, error } = await this.supabase.from(this.tableName).insert([data])
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve()
  }
  
  async update(id: number, data: Product): Promise<void> {
    const { data: eventData, error } = await this.supabase.from(this.tableName).update(data).eq('id', id)
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve()
  }
  
  async delete(id: number): Promise<void> {
    const { data: eventData, error } = await this.supabase.from(this.tableName).delete().eq('id', id)
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve()
  }
  
  async getAll(filter?: Filter): Promise<{ data: Product[], stats: Stats }> {
    let query = this.supabase.from(this.tableName).select('*', { count: 'exact' })
  
    if (filter) {
      if (filter.query) {
        query = query.ilike('title', `%${filter.query}%`)
      }

      if (filter.sortBy) {
        query = query.order(filter.sortBy, { ascending: filter.orderBy === 'asc' })
      }
  
      if (filter.perPage && filter.currentPage) {
        const offset = (filter.currentPage - 1) * filter.perPage
        query = query.range(offset, offset + filter.perPage - 1)
      } else if (filter.perPage) {
        query = query.limit(filter.perPage)
      }
    }
  
    const { data, count, error } = await query

    const perPage = filter?.perPage || count || 1
    const currentPage = filter?.currentPage || 1
    const totalPage = Math.ceil((count || 1) / perPage)
  
    const stats: Stats = {
      totalData: count || 0,
      totalPage,
      currentPage,
      perPage,
    }
  
    return Promise.resolve({ data: data || [], stats })
  }

  async getById(id: number): Promise<Product> {
    const { data, error } = await this.supabase.from(this.tableName).select().eq('id', id).single()
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve(data)
  }

  async buy(id: number, userId: number): Promise<void> {
    const product = await this.getById(id)
    if (!product || !product.id) {
      return Promise.reject('Product not found')
    }

    const history: History = {
      product_id: product.id,
      user_id: userId,
      status: STATUS_SUCCESS,
      transaction_datetime: new Date(),
      description: `Pembelian ${product.name}`,
      bill_number: `${new Date().getTime()}`,
      created_at: new Date(),
      updated_at: new Date()
    }

    await this.historyService.addHistory(history)
  }
  
}