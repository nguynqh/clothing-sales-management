"use client"

import { useState } from "react"
import Link from "next/link"

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { title: "Sản phẩm", href: "/products" },
    { title: "Đơn giá", href: "/pricing" },
    { title: "Bán hàng", href: "/sales" },
    { title: "Nhập hàng", href: "/purchases" },
    { title: "Kho", href: "/inventory" },
  ]

  const stats = [
    { label: "Sản phẩm", value: "156" },
    { label: "Đơn hôm nay", value: "23" },
    { label: "Doanh thu", value: "45.2M" },
    { label: "Tồn kho", value: "1,234" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Quản lý bán hàng</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white w-80 h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                ✕
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-100 font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <h3 className="font-semibold">Thao tác nhanh</h3>
          <Link href="/sales/new" className="block">
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
              + Tạo đơn bán hàng
            </button>
          </Link>
          <Link href="/purchases/new" className="block">
            <button className="w-full border border-gray-300 p-3 rounded-lg hover:bg-gray-50">+ Tạo phiếu nhập</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
