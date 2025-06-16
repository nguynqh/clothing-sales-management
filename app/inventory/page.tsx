"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Package, TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const inventoryData = [
    {
      id: "SP001",
      name: "Áo sơ mi trắng",
      category: "Áo",
      size: "M",
      totalImported: 50,
      totalSold: 25,
      currentStock: 25,
      retailPrice: 350000,
      status: "good",
    },
    {
      id: "SP002",
      name: "Quần jean nam",
      category: "Quần",
      size: "L",
      totalImported: 30,
      totalSold: 15,
      currentStock: 15,
      retailPrice: 450000,
      status: "good",
    },
    {
      id: "SP003",
      name: "Váy học sinh",
      category: "Váy",
      size: "S",
      totalImported: 40,
      totalSold: 10,
      currentStock: 30,
      retailPrice: 280000,
      status: "good",
    },
    {
      id: "SP004",
      name: "Đồ thể dục",
      category: "Đồ thể dục",
      size: "M",
      totalImported: 25,
      totalSold: 17,
      currentStock: 8,
      retailPrice: 200000,
      status: "low",
    },
    {
      id: "SP005",
      name: "Cặp sách da",
      category: "Cặp sách",
      size: "Lớn",
      totalImported: 20,
      totalSold: 8,
      currentStock: 12,
      retailPrice: 650000,
      status: "good",
    },
    {
      id: "SP006",
      name: "Balo thể thao",
      category: "Balo",
      size: "Vừa",
      totalImported: 35,
      totalSold: 15,
      currentStock: 20,
      retailPrice: 380000,
      status: "good",
    },
    {
      id: "SP007",
      name: "Áo polo nam",
      category: "Áo",
      size: "L",
      totalImported: 15,
      totalSold: 15,
      currentStock: 0,
      retailPrice: 320000,
      status: "out",
    },
    {
      id: "SP008",
      name: "Quần short nữ",
      category: "Quần",
      size: "S",
      totalImported: 20,
      totalSold: 16,
      currentStock: 4,
      retailPrice: 250000,
      status: "low",
    },
  ]

  const inventory = [
    { name: "Áo sơ mi trắng", size: "M", imported: 50, sold: 25, stock: 25, status: "Còn hàng" },
    { name: "Quần jean nam", size: "L", imported: 30, sold: 15, stock: 15, status: "Còn hàng" },
    { name: "Đồ thể dục", size: "M", imported: 25, sold: 17, stock: 8, status: "Sắp hết" },
    { name: "Áo polo nam", size: "L", imported: 15, sold: 15, stock: 0, status: "Hết hàng" },
  ]

  const categories = ["all", "Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo"]

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getStatusInfo = (status: string, stock: number) => {
    switch (status) {
      case "good":
        return {
          badge: <Badge className="bg-green-100 text-green-800">Còn hàng</Badge>,
          icon: <TrendingUp className="h-4 w-4 text-green-600" />,
        }
      case "low":
        return {
          badge: <Badge className="bg-yellow-100 text-yellow-800">Sắp hết</Badge>,
          icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
        }
      case "out":
        return {
          badge: <Badge className="bg-red-100 text-red-800">Hết hàng</Badge>,
          icon: <TrendingDown className="h-4 w-4 text-red-600" />,
        }
      default:
        return {
          badge: <Badge variant="secondary">Không xác định</Badge>,
          icon: <Package className="h-4 w-4 text-gray-600" />,
        }
    }
  }

  const getTurnoverRate = (sold: number, imported: number) => {
    return imported > 0 ? ((sold / imported) * 100).toFixed(1) : "0.0"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Còn hàng":
        return "text-green-600"
      case "Sắp hết":
        return "text-yellow-600"
      case "Hết hàng":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // Summary calculations
  const totalProducts = filteredInventory.length
  const totalStock = filteredInventory.reduce((sum, item) => sum + item.currentStock, 0)
  const totalSold = filteredInventory.reduce((sum, item) => sum + item.totalSold, 0)
  const lowStockItems = filteredInventory.filter((item) => item.status === "low" || item.status === "out").length
  const totalValue = filteredInventory.reduce((sum, item) => sum + item.currentStock * item.retailPrice, 0)

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
              <h1 className="text-xl font-bold text-gray-900">Kho tổng quan</h1>
              <p className="text-sm text-gray-600">{filteredInventory.length} sản phẩm</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
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
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold">{totalProducts}</div>
              <div className="text-xs text-gray-600">Tổng SP</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-blue-600">{totalStock}</div>
              <div className="text-xs text-gray-600">Tồn kho</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-green-600">{totalSold}</div>
              <div className="text-xs text-gray-600">Đã bán</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-lg font-bold text-red-600">{lowStockItems}</div>
              <div className="text-xs text-gray-600">Cần nhập</div>
            </CardContent>
          </Card>
        </div>

        {/* Total Inventory Value */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Tổng giá trị tồn kho</div>
                <div className="text-2xl font-bold text-purple-600">{formatPrice(totalValue)}</div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        {/* Inventory List */}
        <div className="space-y-3">
          {filteredInventory.map((item) => {
            const statusInfo = getStatusInfo(item.status, item.currentStock)
            const turnoverRate = getTurnoverRate(item.totalSold, item.totalImported)

            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{item.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Size {item.size}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>

                      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                        <div className="text-center">
                          <div className="text-gray-600">Đã nhập</div>
                          <div className="font-semibold text-blue-600">{item.totalImported}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600">Đã bán</div>
                          <div className="font-semibold text-green-600">{item.totalSold}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600">Tồn kho</div>
                          <div className="font-semibold text-purple-600">{item.currentStock}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {statusInfo.icon}
                          {statusInfo.badge}
                        </div>
                        <div className="text-right">
                          <div className="text-gray-600">Tỷ lệ bán: {turnoverRate}%</div>
                          <div className="font-medium">{formatPrice(item.retailPrice)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Updated Inventory List */}
        <div className="space-y-3">
          {inventory.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600 mb-2">Size {item.size}</div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>Nhập: {item.imported}</div>
                  <div>Bán: {item.sold}</div>
                  <div>Tồn: {item.stock}</div>
                </div>
                <div className={`text-sm font-medium mt-2 ${getStatusColor(item.status)}`}>{item.status}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              <Link href="/products">
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  Quản lý sản phẩm
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
