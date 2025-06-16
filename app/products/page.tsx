"use client"

import { useState } from "react"
import Link from "next/link"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    { id: "SP001", name: "Áo sơ mi trắng", category: "Áo", size: "M", price: 350000, stock: 25 },
    { id: "SP002", name: "Quần jean nam", category: "Quần", size: "L", price: 450000, stock: 15 },
    { id: "SP003", name: "Váy học sinh", category: "Váy", size: "S", price: 280000, stock: 30 },
    { id: "SP004", name: "Đồ thể dục", category: "Đồ thể dục", size: "M", price: 200000, stock: 8 },
  ]

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded">
              ←
            </Link>
            <div>
              <h1 className="text-xl font-bold">Sản phẩm</h1>
              <p className="text-sm text-gray-600">{filteredProducts.length} sản phẩm</p>
            </div>
          </div>
          <Link href="/products/new" className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
            + Thêm
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      {product.category} - Size {product.size}
                    </div>
                    <div className="font-medium text-green-600">{formatPrice(product.price)}</div>
                    <div>Tồn: {product.stock}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 border border-gray-300 rounded text-sm">✏️</button>
                  <button className="p-2 border border-gray-300 rounded text-sm text-red-600">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
