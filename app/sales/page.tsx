"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Filter, Eye, Edit, ShoppingCart, Calendar, Receipt } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const salesOrders = [
    {
      id: "DH001",
      date: "2024-01-15",
      items: [
        { name: "Áo sơ mi trắng", size: "M", price: 350000, quantity: 2, total: 700000 },
        { name: "Quần jean nam", size: "L", price: 450000, quantity: 1, total: 450000 },
      ],
      totalAmount: 1150000,
      status: "completed",
      notes: "Khách hàng VIP",
    },
    {
      id: "DH002",
      date: "2024-01-15",
      items: [{ name: "Váy học sinh", size: "S", price: 280000, quantity: 3, total: 840000 }],
      totalAmount: 840000,
      status: "completed",
      notes: "",
    },
    {
      id: "DH003",
      date: "2024-01-14",
      items: [
        { name: "Đồ thể dục", size: "M", price: 200000, quantity: 2, total: 400000 },
        { name: "Cặp sách da", size: "Lớn", price: 650000, quantity: 1, total: 650000 },
      ],
      totalAmount: 1050000,
      status: "pending",
      notes: "Chờ thanh toán",
    },
    {
      id: "DH004",
      date: "2024-01-14",
      items: [{ name: "Balo thể thao", size: "Vừa", price: 380000, quantity: 1, total: 380000 }],
      totalAmount: 380000,
      status: "completed",
      notes: "",
    },
    {
      id: "DH005",
      date: "2024-01-13",
      items: [
        { name: "Áo sơ mi trắng", size: "S", price: 320000, quantity: 1, total: 320000 },
        { name: "Váy học sinh", size: "M", price: 300000, quantity: 2, total: 600000 },
      ],
      totalAmount: 920000,
      status: "cancelled",
      notes: "Khách hàng hủy đơn",
    },
  ]

  const statuses = ["all", "completed", "pending", "cancelled"]
  const statusLabels = {
    all: "Tất cả",
    completed: "Hoàn thành",
    pending: "Chờ xử lý",
    cancelled: "Đã hủy",
  }

  const filteredOrders = salesOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalRevenue = filteredOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0)

  const totalOrders = filteredOrders.length
  const completedOrders = filteredOrders.filter((order) => order.status === "completed").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Đơn bán hàng</h1>
              <p className="text-sm text-gray-600">{filteredOrders.length} đơn hàng</p>
            </div>
          </div>
          <Link href="/sales/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Tạo đơn
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {statusLabels[status as keyof typeof statusLabels]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold">{totalOrders}</div>
              <div className="text-xs text-gray-600">Tổng đơn</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-green-600">{completedOrders}</div>
              <div className="text-xs text-gray-600">Hoàn thành</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-blue-600">
                {formatPrice(totalRevenue).replace("₫", "").trim()}đ
              </div>
              <div className="text-xs text-gray-600">Doanh thu</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Receipt className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(order.date)}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">Size {item.size}</span>
                      </div>
                      <div className="text-right">
                        <div>
                          {item.quantity} x {formatPrice(item.price)}
                        </div>
                        <div className="font-medium">{formatPrice(item.total)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <div className="font-semibold text-lg">Tổng: {formatPrice(order.totalAmount)}</div>
                    {order.notes && <div className="text-sm text-gray-500 italic">{order.notes}</div>}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              <Link href="/sales/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo đơn hàng mới
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
