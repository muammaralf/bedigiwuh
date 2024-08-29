export type Product = {
  id?: number
  name: string | null
  description: string | null
  price: number | null
  address: string | null
  image_url: string | null
  contact: string | null
  created_at?: Date
  updated_at?: Date
}