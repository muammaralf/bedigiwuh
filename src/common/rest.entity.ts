export type RestResponse = {
  success: boolean
  message: string
  data?: any
  stats?: Stats
}

export type Stats = {
  totalData: number,
  currentPage: number,
  totalPage: number,
  perPage: number
}

export const dataToRestResponse = (data: any, stats?: Stats): RestResponse => {
  if (stats !== undefined) {
    return {
      success: true,
      message: 'Success',
      data,
      stats: stats,
    }
  } else {
    return {
      success: true,
      message: 'Success',
      data
    }
  }
}

export const errorToRestResponse = (error: any): RestResponse => {
  if(typeof error === 'string') {
    return {
      success: false,
      message: error,
    }
  }
  return {
    success: false,
    message: error,
  }
}
