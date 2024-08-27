export type Event = {
  id?: number
  title: string | null
  date: string | null
  place: string | null
  content: string | null
  contact: string | null
  image_url: string | null
  created_at?: Date
  updated_at?: Date
}