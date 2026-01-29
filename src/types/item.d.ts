export interface Item {
  name: string
  id: string
  description: string[]
  fn: (name?: string, page?: string) => Promise<void> | void
  fnRunAt?: 'document-start' | 'document-end'
}

export interface Group {
  name: string
  id: string
  checkFn: () => boolean
  items: Item[]
}
