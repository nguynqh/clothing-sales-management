"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface InventoryItem {
  id: string
  productName: string
  category: string
  size: string
  totalReceived: number
  totalSold: number
  currentStock: number
  retailPrice: number
  costPrice: number
}

export default function InventoryOverviewPage() {
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      productName: "Áo sơ mi trắng",
      category: "Áo",
      size: "S",
      totalReceived: 15,
      totalSold: 8,
      currentStock: 7,
      retailPrice: 150000,
      costPrice: 80000,
    },
    {
      id: "2",
      productName: "Áo sơ mi trắng",
      category: "Áo",
      size: "M",
      totalReceived: 20,
      totalSold: 12,
      currentStock: 8,
      retailPrice: 160000,
      costPrice: 85000,
    },
    {
      id: "3",
      productName: "Váy học sinh",
      category: "Váy",
      size: "S",
      totalReceived: 15,
      totalSold: 10,
      currentStock: 5,
      retailPrice: 200000,
      costPrice: 120000,
    },
    {
      id: "4",
      productName: "Váy học sinh",
      category: "Váy",
      size: "M",
      totalReceived: 12,
      totalSold: 11,
      currentStock: 1,
      retailPrice: 210000,
      costPrice: 125000,
    },
    {
      id: "5",
      productName: "Balo học sinh",
      category: "Balo",
      size: "One Size",
      totalReceived: 10,
      totalSold: 2,
      currentStock: 8,
      retailPrice: 350000,
      costPrice: 200000,
    },
    {
      id: "6",
      productName: "Quần âu",
      category: "Quần",
      size: "M",
      totalReceived: 8,
      totalSold: 8,
      currentStock: 0,
      retailPrice: 180000,
      costPrice: 100000,
    },
  ])

  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sizeFilter, setSizeFilter] = useState<string>("all")

  const categories = ["all", "Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo", "Phụ kiện"]
  const sizes = ["all", "XS", "S", "M", "L", "XL", "XXL", "One Size"]

  const filteredItems = inventoryItems.filter((item) => {
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter
    const sizeMatch = sizeFilter === "all" || item.size === sizeFilter
    return categoryMatch && sizeMatch
  })

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: "Hết hàng", color: "text-red-600", bgColor: "bg-red-50" }
    if (stock <= 3) return { status: "Sắp hết", color: "text-orange-600", bgColor: "bg-orange-50" }
    if (stock <= 10) return { status: "Ít hàng", color: "text-yellow-600", bgColor: "bg-yellow-50" }
    return { status: "Đủ hàng", color: "text-green-600", bgColor: "bg-green-50" }
  }

  const totalProducts = filteredItems.length
  const totalStock = filteredItems.reduce((sum, item) => sum + item.currentStock, 0)
  const totalReceived = filteredItems.reduce((sum, item) => sum + item.totalReceived, 0)
  const totalSold = filteredItems.reduce((sum, item) => sum + item.totalSold, 0)
  const outOfStockItems = filteredItems.filter((item) => item.currentStock === 0).length
  const lowStockItems = filteredItems.filter((item) => item.currentStock > 0 && item.currentStock <= 3).length

  const totalInventoryValue = filteredItems.reduce((sum, item) => sum + item.currentStock * item.costPrice, 0)
  const potentialRevenue = filteredItems.reduce((sum, item) => sum + item.currentStock * item.retailPrice, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 flex items-center">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 mr-3" />
        </Link>
        <h1 className="text-xl font-bold">Kho tổng quan</h1>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{totalStock}</p>
            <p className="text-sm text-gray-600">Tổng tồn kho</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">{totalSold}</p>
            <p className="text-sm text-gray-600">Đã bán</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">{outOfStockItems}</p>
            <p className="text-sm text-gray-600">Hết hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="text-2xl font-bold">{lowStockItems}</p>
            <p className="text-sm text-gray-600">Sắp hết</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tổng quan tài chính</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Giá trị tồn kho:</span>
              <span className="font-semibold text-blue-600">{totalInventoryValue.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Doanh thu tiềm năng:</span>
              <span className="font-semibold text-green-600">{potentialRevenue.toLocaleString("vi-VN")}đ</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Lợi nhuận tiềm năng:</span>
              <span className="font-bold text-purple-600">
                {(potentialRevenue - totalInventoryValue).toLocaleString("vi-VN")}đ
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả size</SelectItem>
              {sizes.slice(1).map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory List */}
      <div className="p-4 space-y-3">
        {filteredItems.map((item) => {
          const stockStatus = getStockStatus(item.currentStock)
          return (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.productName}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant="outline">{item.size}</Badge>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${stockStatus.color} ${stockStatus.bgColor}`}>
                    {stockStatus.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div className="text-center">
                    <p className="text-gray-600">Đã nhập</p>
                    <p className="font-semibold text-blue-600">{item.totalReceived}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Đã bán</p>
                    <p className="font-semibold text-green-600">{item.totalSold}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Tồn kho</p>
                    <p className={`font-semibold ${stockStatus.color}`}>{item.currentStock}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Giá trị tồn kho</p>
                    <p className="font-semibold text-blue-600">
                      {(item.currentStock * item.costPrice).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Doanh thu tiềm năng</p>
                    <p className="font-semibold text-green-600">
                      {(item.currentStock * item.retailPrice).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
