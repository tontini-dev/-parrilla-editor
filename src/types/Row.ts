import { Product } from './Product'

export interface Row {
  id: string
  products: Product[]
  alignment: 'LEFT' | 'CENTER' | 'RIGHT'
}