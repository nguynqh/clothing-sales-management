"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, DollarSign, ShoppingCart, TruckIcon, BarChart3, Plus, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      title: "Sản phẩm",
      href: "/products",
      icon: Package,
      description: "Quản lý danh sách sản phẩm",
      color: "bg-blue-500",
    },
    {
      title: "Đơn giá",
      href: "/pricing",
      icon: DollarSign,
      description: "Quản lý giá bán theo loại & size",
      color: "bg-green-500",
    },
    {
      title: "Đơn bán hàng",
      href: "/sales",
      icon: ShoppingCart,
      description: "Tạo và quản lý hóa đơn bán hàng",
      color: "bg-purple-500",
    },
  ]

  const stats = [
    { label: "Tổng sản phẩm", value: "156", change: "+12%" },
    { label: "Đơn hàng hôm nay", value: "23", change: "+8%" },
    { label: "Doanh thu tháng", value: "45.2M", change: "+15%" },
    { label: "Tồn kho", value: "1,234", change: "-3%" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900">Quản lý bán hàng</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white w-80 h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu chính</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/sales/new">
              <Button className="w-full justify-start" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Tạo đơn bán hàng mới
              </Button>
            </Link>
            <Link href="/purchases/new">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Tạo phiếu nhập hàng
              </Button>
            </Link>
            <Link href="/products/new">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Thêm sản phẩm mới
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Đơn hàng #DH001</div>
                <div className="text-sm text-gray-600">Áo sơ mi trắng - Size M</div>
              </div>
              <div className="text-right">
                <div className="font-medium">350,000đ</div>
                <div className="text-xs text-gray-500">2 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Nhập hàng #NH005</div>
                <div className="text-sm text-gray-600">Quần jean nam - Size L</div>
              </div>
              <div className="text-right">
                <div className="font-medium">20 cái</div>
                <div className="text-xs text-gray-500">5 giờ trước</div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">Sản phẩm mới</div>
                <div className="text-sm text-gray-600">Váy học sinh - Size S</div>
              </div>
              <div className="text-right">
                <div className="font-medium">Đã thêm</div>
                <div className="text-xs text-gray-500">1 ngày trước</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
