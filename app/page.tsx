"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, DollarSign, ShoppingCart, TruckIcon, BarChart3, Plus, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { title: "Sản phẩm", href: "/products", icon: Package, color: "bg-blue-500" },
    { title: "Đơn giá", href: "/pricing", icon: DollarSign, color: "bg-green-500" },
    { title: "Bán hàng", href: "/sales", icon: ShoppingCart, color: "bg-purple-500" },
    { title: "Nhập hàng", href: "/purchases", icon: TruckIcon, color: "bg-orange-500" },
    { title: "Kho", href: "/inventory", icon: BarChart3, color: "bg-red-500" },
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
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white w-80 h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                >
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold">Thao tác nhanh</h3>
            <Link href="/sales/new">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Tạo đơn bán hàng
              </Button>
            </Link>
            <Link href="/purchases/new">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Tạo phiếu nhập
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-3">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
