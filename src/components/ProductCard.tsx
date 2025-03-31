import React from 'react'
import { Product } from '../types/Product'
import './ProductCard.scss'

interface Props {
  product: Product
  draggable?: boolean
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, product: Product) => void
  onRemove?: () => void
}

const ProductCard: React.FC<Props> = ({
  product,
  draggable = false,
  onDragStart,
  onRemove,
}) => {
  return (
    <div
      className="product-card"
      draggable={draggable}
      onDragStart={(e) => onDragStart?.(e, product)}
    >
      <img src={product.image} alt={product.name} />
      <div className="info">
        <strong>{product.name}</strong>
        <p>{product.price}</p>
      </div>
      {onRemove && (
        <button className="remove-btn" onClick={onRemove}>
          ❌
        </button>
      )}
    </div>
  )
}

export default ProductCard