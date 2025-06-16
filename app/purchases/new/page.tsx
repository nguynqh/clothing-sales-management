"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

interface PurchaseItem {
  id: string
  productName: string
  size: string
  importPrice: number
  quantity: number
  total: number
}

export default function NewPurchaseOrderPage() {
  const [purchaseId] = useState(`NH${String(Date.now()).slice(-6)}`)
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [newItem, setNewItem] = useState({
    productName: "",
    size: "",
    importPrice: "",
    quantity: "1",
  })

  const products = ["Áo sơ mi trắng", "Quần jean nam", "Váy học sinh", "Đồ thể dục", "Cặp sách", "Balo"]
  const sizes = ["S", "M", "L", "XL", "Vừa", "Lớn"]

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const addItem = () => {
    if (!newItem.productName || !newItem.size || !newItem.importPrice) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    const price = Number.parseInt(newItem.importPrice.replace(/\D/g, ""))
    const quantity = Number.parseInt(newItem.quantity)

    const item: PurchaseItem = {
      id: `${Date.now()}-${Math.random()}`,
      productName: newItem.productName,
      size: newItem.size,
      importPrice: price,
      quantity: quantity,
      total: price * quantity,
    }

    setPurchaseItems([...purchaseItems, item])
    setNewItem({ productName: "", size: "", importPrice: "", quantity: "1" })
  }

  const getTotalAmount = () => purchaseItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (purchaseItems.length === 0) {
      alert("Vui lòng thêm sản phẩm")
      return
    }
    console.log("Purchase:", { purchaseId, items: purchaseItems, total: getTotalAmount() })
    alert("Phiếu nhập đã được tạo!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/purchases" className="p-2 hover:bg-gray-100 rounded">
            ←
          </Link>
          <h1 className="text-xl font-bold">Tạo phiếu nhập</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Mã phiếu nhập</label>
              <input
                type="text"
                value={purchaseId}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h3 className="font-semibold">Thêm sản phẩm</h3>

            <div className="space-y-3">
              <select
                value={newItem.productName}
                onChange={(e) => setNewItem((prev) => ({ ...prev, productName: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Chọn sản phẩm...</option>
                {products.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newItem.size}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, size: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Size...</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Số lượng"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <input
                type="text"
                placeholder="Giá nhập (VNĐ)"
                value={newItem.importPrice}
                onChange={(e) => setNewItem((prev) => ({ ...prev, importPrice: e.target.value.replace(/\D/g, "") }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />

              <button
                type="button"
                onClick={addItem}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                + Thêm vào phiếu
              </button>
            </div>
          </div>

          {purchaseItems.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4 space-y-3">
              <h3 className="font-semibold">Sản phẩm nhập ({purchaseItems.length})</h3>
              {purchaseItems.map((item) => (
                <div key={item.id} className="border rounded p-3 bg-gray-50">
                  <div className="font-medium">{item.productName}</div>
                  <div className="text-sm text-gray-600">
                    Size {item.size} - SL: {item.quantity} - Giá: {formatPrice(item.importPrice)}
                  </div>
                  <div className="font-semibold text-blue-600">{formatPrice(item.total)}</div>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-medium">Tổng:</span>
                <span className="text-2xl font-bold text-blue-600">{formatPrice(getTotalAmount())}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={purchaseItems.length === 0}
              className="w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
            >
              💾 Lưu phiếu nhập
            </button>
            <Link href="/purchases" className="block">
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
