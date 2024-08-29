export type Filter = {
  query?: string
  perPage?: number
  currentPage?: number
  sortBy?: string
  userId?: number
  transactionDay?: string
  orderBy?: 'asc' | 'desc'
}