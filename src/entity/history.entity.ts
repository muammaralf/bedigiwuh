export type History = {
  id?: number;
  user_id: number;
  product_id: number;
  description: string;
  bill_number: string;
  status: number
  transaction_datetime: Date;
  product?: any;
  user?: any;
  created_at?: Date;
  updated_at?: Date;
} 

export const STATUS_SUCCESS = 1
export const STATUS_FAILED = 2