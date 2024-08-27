export type User = {
  id: number
  email: string
  fullname: string | null
  phone_number: string | null
  password: string | null
  google_id?: string | null 
  created_at?: Date
  updated_at?: Date
}