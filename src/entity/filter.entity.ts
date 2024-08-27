export type Filter = {
  query?: string
  perPage?: number
  currentPage?: number
  sortBy?: string
  orderBy?: 'asc' | 'desc'
}