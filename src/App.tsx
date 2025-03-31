import React, { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'
import Row from './components/Row'
import { Product } from './types/Product'
import { Row as RowType } from './types/Row'
import './App.scss'

function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [rows, setRows] = useState<RowType[]>([])

  const handleDragStart = (event: React.DragEvent, product: Product) => {
    event.dataTransfer.setData('product', JSON.stringify(product))
  }

  const handleDropProduct = (product: Product, targetRowId: string) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        const filteredProducts = row.products.filter((p) => p.id !== product.id)
        return { ...row, products: filteredProducts }
      })

      return updatedRows.map((row) => {
        if (row.id === targetRowId && row.products.length < 3) {
          return {
            ...row,
            products: [...row.products, product],
          }
        }
        return row
      })
    })
  }

  const handleAddRow = () => {
    const newRow: RowType = {
      id: `row-${crypto.randomUUID()}`,
      products: [],
      alignment: 'LEFT',
    }
    setRows((prevRows) => [...prevRows, newRow])
  }

  const handleRemoveProductFromRow = (productId: string, rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, products: row.products.filter((p) => p.id !== productId) }
          : row
      )
    )
  }

  const handleChangeAlignment = (rowId: string, alignment: 'LEFT' | 'CENTER' | 'RIGHT') => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, alignment } : row
      )
    )
  }

  const handleSaveParrilla = () => {
    console.log('🧩 Estado actual de la parrilla:')
    console.log(JSON.stringify(rows, null, 2))
    alert('¡Parrilla guardada! Revisa la consola.')
  }

  const handleResetParrilla = () => {
    setRows([])
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/products.json')
        const productsFromJson = await res.json()
  
        setAllProducts(productsFromJson)
  
        const urlParams = new URLSearchParams(window.location.search)
        const stateFromUrl = urlParams.get('state')
  
        if (stateFromUrl) {
          try {
            const decoded: RowType[] = JSON.parse(decodeURIComponent(stateFromUrl))
  
            // Garantir que todos os produtos do estado existam no allProducts
            const productMap = new Map(productsFromJson.map((p: Product) => [p.id, p]))
  
            const enrichedRows = decoded.map((row) => ({
              ...row,
              products: row.products
                .map((p) => productMap.get(p.id))
                .filter((p): p is Product => !!p)
            }))
  
            setRows(enrichedRows)
            return
          } catch (e) {
            console.error('Error al cargar el estado desde la URL:', e)
          }
        }
  
        // Se não há estado via URL, inicia com uma row padrão
        const initialRow: RowType = {
          id: 'row-1',
          products: [productsFromJson[0], productsFromJson[1]],
          alignment: 'CENTER',
        }
  
        setRows([initialRow])
      } catch (error) {
        console.error('Error al cargar los productos:', error)
      }
    }
  
    loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/products.json')
        const productsFromJson = await res.json()

        setAllProducts(productsFromJson)

        const urlParams = new URLSearchParams(window.location.search)
        const stateFromUrl = urlParams.get('state')

        if (stateFromUrl) {
          try {
            const decoded = JSON.parse(decodeURIComponent(stateFromUrl))
            setRows(decoded)
            return
          } catch (e) {
            console.error('Error al cargar el estado desde la URL:', e)
          }
        }

        const initialRow: RowType = {
          id: 'row-1',
          products: [productsFromJson[0], productsFromJson[1]],
          alignment: 'CENTER',
        }

        setRows([initialRow])
      } catch (error) {
        console.error('Error al cargar los productos:', error)
      }
    }

    loadData()
  }, [])

  // Calcular productos no asignados (disponibles)
  const assignedProductIds = new Set(rows.flatMap((row) => row.products.map((p) => p.id)))
  const availableProducts = allProducts.filter((product) => !assignedProductIds.has(product.id))

  return (
    <main>
      <h1>Editor de parrilla</h1>

      <section>
        <h2>Productos disponibles</h2>
        <div className="product-pool">
          {availableProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              draggable
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Zona de edición</h2>
        {rows.map((row) => (
          <Row
            key={row.id}
            row={row}
            onDropProduct={handleDropProduct}
            onDragStart={handleDragStart}
            onRemoveProduct={handleRemoveProductFromRow}
            onChangeAlignment={handleChangeAlignment}
          />
        ))}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button onClick={handleAddRow}>➕ Añadir nueva fila</button>
          <button onClick={handleSaveParrilla}>💾 Guardar parrilla</button>
          <button onClick={handleResetParrilla}>🗑️ Reiniciar parrilla</button>
        </div>
      </section>
    </main>
  )
}

export default App