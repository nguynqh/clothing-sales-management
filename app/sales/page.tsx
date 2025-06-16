"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Filter, Eye, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const orders = [
    { id: "DH001", date: "15/01/2024", total: 1150000, status: "Hoàn thành" },
    { id: "DH002", date: "15/01/2024", total: 840000, status: "Hoàn thành" },
    { id: "DH003", date: "14/01/2024", total: 1050000, status: "Chờ xử lý" },
  ]

  const statuses = ["all", "Hoàn thành", "Chờ xử lý"]
  const statusLabels = {
    all: "Tất cả",
    "Hoàn thành": "Hoàn thành",
    "Chờ xử lý": "Chờ xử lý",
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)

  const totalOrders = filteredOrders.length
  const completedOrders = filteredOrders.filter((order) => order.status === "Hoàn thành").length

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
                {formatPrice(totalRevenue).replace("đ", "").trim()}đ
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
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                    <div className="font-semibold text-lg text-green-600">{formatPrice(order.total)}</div>
                    <div className="text-sm text-blue-600">{order.status}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
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
