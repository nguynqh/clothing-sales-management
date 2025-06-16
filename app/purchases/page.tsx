"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Filter, Eye, Package } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const purchases = [
    { id: "NH001", date: "10/01/2024", total: 7300000, status: "Hoàn thành" },
    { id: "NH002", date: "12/01/2024", total: 6450000, status: "Hoàn thành" },
    { id: "NH003", date: "13/01/2024", total: 6950000, status: "Chờ giao" },
  ]

  const statuses = ["all", "Hoàn thành", "Chờ giao"]
  const statusLabels = {
    all: "Tất cả",
    "Hoàn thành": "Hoàn thành",
    "Chờ giao": "Chờ giao",
  }

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch = purchase.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || purchase.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const totalCost = filteredPurchases
    .filter((purchase) => purchase.status === "Hoàn thành")
    .reduce((sum, purchase) => sum + purchase.total, 0)

  const totalPurchases = filteredPurchases.length
  const completedPurchases = filteredPurchases.filter((purchase) => purchase.status === "Hoàn thành").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Phiếu nhập hàng</h1>
              <p className="text-sm text-gray-600">{filteredPurchases.length} phiếu nhập</p>
            </div>
          </div>
          <Link href="/purchases/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Tạo phiếu
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
                placeholder="Tìm kiếm phiếu nhập..."
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
              <div className="text-lg font-bold">{totalPurchases}</div>
              <div className="text-xs text-gray-600">Tổng phiếu</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-green-600">{completedPurchases}</div>
              <div className="text-xs text-gray-600">Hoàn thành</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-blue-600">{formatPrice(totalCost)}</div>
              <div className="text-xs text-gray-600">Chi phí</div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders List */}
        <div className="space-y-3">
          {filteredPurchases.map((purchase) => (
            <Card key={purchase.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{purchase.id}</div>
                    <div className="text-sm text-gray-600">{purchase.date}</div>
                    <div className="font-semibold text-lg text-blue-600">{formatPrice(purchase.total)}</div>
                    <div className="text-sm text-orange-600">{purchase.status}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPurchases.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy phiếu nhập</h3>
              <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              <Link href="/purchases/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo phiếu nhập mới
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
