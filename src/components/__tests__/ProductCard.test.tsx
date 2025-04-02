import { render, screen } from '@testing-library/react'
import ProductCard from '../ProductCard'
import { Product } from '../../types/Product'

const mockProduct: Product = {
  id: 'p1',
  name: 'Jeans azules',
  image: 'https://picsum.photos/200',
  price: '36,87 EUR',
}

describe('ProductCard', () => {
  it('muestra el nombre y el precio del producto', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Jeans azules')).toBeInTheDocument()
    expect(screen.getByText('36,87 EUR')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image)
  })
})