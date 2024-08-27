import { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "../../util/supabase/supabase";
import { User } from "../../entity/user.entity";
import { IUserUseCase } from "./user.use_case";
import { objectToCamel } from "ts-case-convert";

export class UserService implements IUserUseCase {
  private supabase: SupabaseClient

  constructor(){
    this.supabase = getSupabaseClient()
  }

  async register(requestData: User): Promise<any> {
    const { password, ...options } = requestData
    const { data, error } = await this.supabase.auth.signUp({
      email: requestData.email,
      password: requestData.password ?? '@Admin123',
      options: {
        data: options
      }
    }).catch((error: any) => {
      console.log(error)
      return Promise.reject(error)
    })

    await this.insertToUserTable(requestData)

    return Promise.resolve(objectToCamel(data))
  }

  async insertToUserTable(requestData: User): Promise<void> {
    const { password, ...user } = requestData
    const { data, error } = await this.supabase.from('users').insert([user])
    if (error) {
      return Promise.reject(error)
    }
  }

  async login(phoneNumber: string, password: string): Promise<any> {
    const masterData = await this.supabase.from('users').select().eq('phone_number', phoneNumber).single()
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: masterData.data.email.toString(),
      password: password,
    }).catch((error: any) => {
      console.log(error)
      return Promise.reject(error)
    })

    if (error || data.user === null) {
      return Promise.reject({
        ...error,
        message: error?.message ?? 'Invalid phone number or password'
      })
    }

    return Promise.resolve(objectToCamel(data))
  }

  async getMe(): Promise<any> {
    const { data, error } = await this.supabase.auth.getUser().catch((error: any) => {
      console.log(error)
      return Promise.reject(error)
    })

    if (error || data.user === null) {
      return Promise.reject(error)
    }

    return Promise.resolve(objectToCamel(data))
  }
  
}