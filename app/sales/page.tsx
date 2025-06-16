"use client"

import { useState } from "react"
import Link from "next/link"

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    { id: "DH001", date: "15/01/2024", total: 1150000, status: "Hoàn thành" },
    { id: "DH002", date: "15/01/2024", total: 840000, status: "Hoàn thành" },
    { id: "DH003", date: "14/01/2024", total: 1050000, status: "Chờ xử lý" },
  ]

  const filteredOrders = orders.filter((order) => order.id.toLowerCase().includes(searchTerm.toLowerCase()))

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
              <h1 className="text-xl font-bold">Đơn bán hàng</h1>
              <p className="text-sm text-gray-600">{filteredOrders.length} đơn hàng</p>
            </div>
          </div>
          <Link href="/sales/new" className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
            + Tạo đơn
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-lg font-bold">{filteredOrders.length}</div>
            <div className="text-xs text-gray-600">Tổng đơn</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-lg font-bold text-green-600">
              {filteredOrders.filter((o) => o.status === "Hoàn thành").length}
            </div>
            <div className="text-xs text-gray-600">Hoàn thành</div>
          </div>
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-lg font-bold text-blue-600">
              {formatPrice(filteredOrders.reduce((sum, order) => sum + order.total, 0))}
            </div>
            <div className="text-xs text-gray-600">Doanh thu</div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{order.id}</div>
                  <div className="text-sm text-gray-600">{order.date}</div>
                  <div className="font-semibold text-lg text-green-600">{formatPrice(order.total)}</div>
                  <div className="text-sm text-blue-600">{order.status}</div>
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
