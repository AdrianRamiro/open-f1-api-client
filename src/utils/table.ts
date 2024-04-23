export interface sortOrder {
  key: string
  order: 'asc' | 'desc'
}
export const sortData = (data: any, sortOrder: sortOrder) => {
  return data.sort((a: any, b: any) => {
    const modifier = sortOrder.order === 'asc' ? 1 : -1
    if (a[sortOrder.key] < b[sortOrder.key]) return -1 * modifier
    if (a[sortOrder.key] > b[sortOrder.key]) return 1 * modifier
    return 0
  })
}

export const paginateData = (data: any, page: number, pageSize: number) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return data.slice(start, end)
}
