"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    retailPrice: "",
    stock: "",
    notes: "",
  })

  const categories = ["Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product data:", formData)
    alert("Sản phẩm đã được thêm!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/products" className="p-2 hover:bg-gray-100 rounded">
            ←
          </Link>
          <h1 className="text-xl font-bold">Thêm sản phẩm</h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tên sản phẩm *</label>
              <input
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Loại *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Chọn loại</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Size *</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Chọn size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Giá bán (VNĐ) *</label>
                <input
                  type="text"
                  placeholder="0"
                  value={formData.retailPrice}
                  onChange={(e) => handleInputChange("retailPrice", e.target.value.replace(/\D/g, ""))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Số lượng *</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Ghi chú</label>
              <textarea
                placeholder="Ghi chú về sản phẩm"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-medium hover:bg-blue-700"
            >
              💾 Lưu sản phẩm
            </button>
            <Link href="/products" className="block">
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
