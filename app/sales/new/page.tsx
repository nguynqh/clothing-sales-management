"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

interface OrderItem {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  total: number
}

export default function NewSalesOrderPage() {
  const [orderId] = useState(`DH${String(Date.now()).slice(-6)}`)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const products = [
    { id: "SP001", name: "Áo sơ mi trắng", sizes: ["S", "M", "L"], prices: { S: 320000, M: 350000, L: 380000 } },
    { id: "SP002", name: "Quần jean nam", sizes: ["M", "L"], prices: { M: 420000, L: 450000 } },
    { id: "SP003", name: "Váy học sinh", sizes: ["S", "M"], prices: { S: 280000, M: 300000 } },
  ]

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const addProduct = () => {
    if (!selectedProduct || !selectedSize) return

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const price = product.prices[selectedSize as keyof typeof product.prices]
    const newItem: OrderItem = {
      id: `${selectedProduct}-${selectedSize}-${Date.now()}`,
      name: product.name,
      size: selectedSize,
      price: price,
      quantity: 1,
      total: price,
    }
    setOrderItems([...orderItems, newItem])
    setSelectedProduct("")
    setSelectedSize("")
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter((_, i) => i !== index))
      return
    }
    const updatedItems = [...orderItems]
    updatedItems[index].quantity = newQuantity
    updatedItems[index].total = updatedItems[index].price * newQuantity
    setOrderItems(updatedItems)
  }

  const getTotalAmount = () => orderItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderItems.length === 0) {
      alert("Vui lòng thêm sản phẩm")
      return
    }
    console.log("Order:", { orderId, items: orderItems, total: getTotalAmount() })
    alert("Đơn hàng đã được tạo!")
  }

  const selectedProductData = products.find((p) => p.id === selectedProduct)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/sales" className="p-2 hover:bg-gray-100 rounded">
            ←
          </Link>
          <h1 className="text-xl font-bold">Tạo đơn hàng</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Mã đơn hàng</label>
              <input
                type="text"
                value={orderId}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h3 className="font-semibold">Thêm sản phẩm</h3>

            <div className="space-y-3">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Chọn sản phẩm...</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {selectedProductData && (
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Chọn size...</option>
                  {selectedProductData.sizes.map((size) => (
                    <option key={size} value={size}>
                      Size {size} -{" "}
                      {formatPrice(selectedProductData.prices[size as keyof typeof selectedProductData.prices])}
                    </option>
                  ))}
                </select>
              )}

              <button
                type="button"
                onClick={addProduct}
                disabled={!selectedProduct || !selectedSize}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                + Thêm vào đơn
              </button>
            </div>
          </div>

          {orderItems.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4 space-y-3">
              <h3 className="font-semibold">Sản phẩm ({orderItems.length})</h3>
              {orderItems.map((item, index) => (
                <div key={item.id} className="border rounded p-3 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        Size {item.size} - {formatPrice(item.price)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-semibold">{formatPrice(item.total)}</div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-medium">Tổng:</span>
                <span className="text-2xl font-bold text-green-600">{formatPrice(getTotalAmount())}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={orderItems.length === 0}
              className="w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              💾 Lưu đơn hàng
            </button>
            <Link href="/sales" className="block">
              <button
                type="button"
                className="w-full border border-gray-300 p-4 rounded-lg text-lg font-medium hover:bg-gray-50"
              >
                Hủy
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
