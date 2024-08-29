import { SupabaseClient } from "@supabase/supabase-js";
import { Stats } from "../../common/rest.entity";
import { Filter } from "../../entity/filter.entity";
import { History } from "../../entity/history.entity";
import { IHistoryUseCase } from "./history.use_case";
import { getSupabaseClient } from "../../util/supabase/supabase";

export class HistoryService implements IHistoryUseCase {
  private supabase: SupabaseClient
  private tableName: string = 'histories'

  constructor(){
    this.supabase = getSupabaseClient()
  }

  async addHistory(data: History): Promise<void> {
    const { data: eventData, error } = await this.supabase.from(this.tableName).insert([data])
    if (error) {
      return Promise.reject(error)
    }
  
    return Promise.resolve()
  }
  
  async getHistories(filter?: Filter): Promise<{ data: History[], stats: Stats }> {
    let query = this.supabase
    .from(this.tableName)
    .select(`
        id,
        user_id,
        product_id,
        transaction_datetime,
        bill_number,
        description,
        status,
        product:product_id (*),
        user:user_id (*),
        created_at,
        updated_at
      `, { count: 'exact' })
    
  
    if (filter) {
      if (filter.userId) {
        query = query.eq('user_id', filter.userId)
      }

      if (filter.sortBy) {
        query = query.order(filter.sortBy, { ascending: filter.orderBy === 'asc' })
      }

      if (filter.transactionDay) {
        query = query
          .gte('transaction_datetime', `${filter.transactionDay} 00:00:00`)
          .lte('transaction_datetime', `${filter.transactionDay} 23:59:59`) 
  
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
  
}