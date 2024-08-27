import { SupabaseClient } from "@supabase/supabase-js";
import { Video } from "../../entity/video.entity";
import { IVideoUseCase } from "./video.use_case";
import { getSupabaseClient } from "../../util/supabase/supabase";
import { Stats } from "../../common/rest.entity";
import { Filter } from "../../entity/filter.entity";

export class VideoService implements IVideoUseCase {
  private supabase: SupabaseClient
  private tableName: string = 'videos'

  constructor(){
    this.supabase = getSupabaseClient()
  }

  async create(data: Video): Promise<void> {
    const { data: eventData, error } = await this.supabase.from(this.tableName).insert([data])
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve()
  }
  
  async update(id: number, data: Video): Promise<void> {
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
  
  async getAll(filter?: Filter): Promise<{ data: Video[], stats: Stats }> {
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

  async getById(id: number): Promise<Video> {
    const { data, error } = await this.supabase.from(this.tableName).select().eq('id', id).single()
    if (error) {
      return Promise.reject(error)
    }

    return Promise.resolve(data)
  }
  
}