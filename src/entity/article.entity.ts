export type Article = {
  id?: number
  title: string | null
  content: string | null
  image_url: string | null
  author: string | null
  created_at?: Date
  updated_at?: Date
}