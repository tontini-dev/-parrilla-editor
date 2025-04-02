import React from 'react'
import { Product } from '../types/Product'
import { Row as RowType } from '../types/Row'
import ProductCard from './ProductCard'
import './Row.scss'

interface Props {
  row: RowType
  onDropProduct: (product: Product, rowId: string) => void
  onDragStart?: (e: React.DragEvent, product: Product) => void
  onRemoveProduct?: (productId: string, rowId: string) => void
  onChangeAlignment?: (rowId: string, alignment: 'LEFT' | 'CENTER' | 'RIGHT') => void
}

const Row: React.FC<Props> = ({ row, onDropProduct, onDragStart, onRemoveProduct, onChangeAlignment }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const productData = e.dataTransfer.getData('product')
    if (productData) {
      const product: Product = JSON.parse(productData)
      onDropProduct(product, row.id)
    }
  }

  return (
    <div
      className={`row ${
        row.products.length < 3
          ? `row--${row.alignment.toLowerCase()}`
          : 'row--fixed'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="row-template-selector">
        <label>Alinhamento:</label>
        <select
          value={row.alignment}
          onChange={(e) =>
            onChangeAlignment?.(row.id, e.target.value as 'LEFT' | 'CENTER' | 'RIGHT')
          }
        >
          <option value="LEFT">Classic template</option>
          <option value="CENTER">Balanced template</option>
          <option value="RIGHT">Aesthetic template</option>
        </select>
      </div>

      {row.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          draggable
          onDragStart={onDragStart}
          onRemove={() => onRemoveProduct?.(product.id, row.id)}
        />
      ))}
    </div>
  )
}

export default Row