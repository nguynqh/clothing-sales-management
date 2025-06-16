"use client"

import { useState } from "react"
import Link from "next/link"

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const purchases = [
    { id: "NH001", date: "10/01/2024", total: 7300000, status: "Hoàn thành" },
    { id: "NH002", date: "12/01/2024", total: 6450000, status: "Hoàn thành" },
    { id: "NH003", date: "13/01/2024", total: 6950000, status: "Chờ giao" },
  ]

  const filteredPurchases = purchases.filter((purchase) => purchase.id.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded">
              ←
            </Link>
            <div>
              <h1 className="text-xl font-bold">Phiếu nhập hàng</h1>
              <p className="text-sm text-gray-600">{filteredPurchases.length} phiếu nhập</p>
            </div>
          </div>
          <Link href="/purchases/new" className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
            + Tạo phiếu
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Tìm kiếm phiếu nhập..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <div className="space-y-3">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{purchase.id}</div>
                  <div className="text-sm text-gray-600">{purchase.date}</div>
                  <div className="font-semibold text-lg text-blue-600">{formatPrice(purchase.total)}</div>
                  <div className="text-sm text-orange-600">{purchase.status}</div>
                </div>
                <button className="p-2 border border-gray-300 rounded text-sm">👁️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
